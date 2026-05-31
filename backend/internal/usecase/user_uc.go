package usecase

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"focus-astu-hub/internal/domain"
)

type UserUseCase struct {
	users domain.UserRepository
}

func NewUserUseCase(users domain.UserRepository) *UserUseCase {
	return &UserUseCase{users: users}
}

func (uc *UserUseCase) GetUser(ctx context.Context, id string) (*domain.User, error) {
	return uc.users.GetByID(ctx, id)
}

func (uc *UserUseCase) ListUsers(ctx context.Context) ([]*domain.User, error) {
	return uc.users.ListAll(ctx)
}

type CompleteProfileInput struct {
	FullName         string
	TelegramHandle   string
	CodeforcesHandle string
	LeetCodeHandle   *string
	AtCoderHandle    *string
	LinkedInURL      *string
	Bio              *string
}

func (uc *UserUseCase) CompleteProfile(ctx context.Context, userID string, input CompleteProfileInput) (*domain.User, error) {
	u, err := uc.users.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if u.IsBanned {
		return nil, fmt.Errorf("account is banned")
	}

	u.FullName = input.FullName
	u.TelegramHandle = input.TelegramHandle
	u.CodeforcesHandle = input.CodeforcesHandle
	u.LeetCodeHandle = input.LeetCodeHandle
	u.AtCoderHandle = input.AtCoderHandle
	u.LinkedInURL = input.LinkedInURL
	u.Bio = input.Bio
	u.IsActive = true

	if err := uc.users.Update(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}

type UpdateProfileInput struct {
	FullName         string
	TelegramHandle   string
	CodeforcesHandle string
	LeetCodeHandle   *string
	AtCoderHandle    *string
	LinkedInURL      *string
	Bio              *string
}

func (uc *UserUseCase) UpdateProfile(ctx context.Context, userID string, input UpdateProfileInput) (*domain.User, error) {
	u, err := uc.users.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if u.IsBanned {
		return nil, fmt.Errorf("account is banned")
	}

	u.FullName = input.FullName
	u.TelegramHandle = input.TelegramHandle
	u.CodeforcesHandle = input.CodeforcesHandle
	u.LeetCodeHandle = input.LeetCodeHandle
	u.AtCoderHandle = input.AtCoderHandle
	u.LinkedInURL = input.LinkedInURL
	u.Bio = input.Bio

	if err := uc.users.Update(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}

// GenerateAPIKey creates a new random API key, stores the SHA-256 hash, and
// returns the raw key exactly once.
func (uc *UserUseCase) GenerateAPIKey(ctx context.Context, userID string) (rawKey string, err error) {
	buf := make([]byte, 32)
	if _, err = rand.Read(buf); err != nil {
		return "", fmt.Errorf("generate random key: %w", err)
	}
	rawKey = hex.EncodeToString(buf)
	hash := sha256Hash(rawKey)
	return rawKey, uc.users.SetAPIKeyHash(ctx, userID, hash)
}

func (uc *UserUseCase) RevokeAPIKey(ctx context.Context, userID string) error {
	return uc.users.ClearAPIKeyHash(ctx, userID)
}

func (uc *UserUseCase) HasAPIKey(ctx context.Context, userID string) (bool, error) {
	return uc.users.HasAPIKey(ctx, userID)
}

func (uc *UserUseCase) ValidateAPIKey(ctx context.Context, rawKey string) (*domain.User, error) {
	hash := sha256Hash(rawKey)
	return uc.users.GetByAPIKeyHash(ctx, hash)
}

func sha256Hash(s string) string {
	h := sha256.Sum256([]byte(s))
	return hex.EncodeToString(h[:])
}

// ── Admin operations ─────────────────────────────────────────────────────────

type AdminUserUseCase struct {
	users  domain.UserRepository
	squads domain.SquadRepository
}

func NewAdminUserUseCase(users domain.UserRepository, squads domain.SquadRepository) *AdminUserUseCase {
	return &AdminUserUseCase{users: users, squads: squads}
}

func (uc *AdminUserUseCase) SetRole(ctx context.Context, callerRole domain.Role, targetUserID string, newRole domain.Role) error {
	// ADMIN can assign up to SQUAD_LEAD; SUPER_ADMIN can assign up to ADMIN
	maxAssignable := domain.RoleSquadLead
	if callerRole == domain.RoleSuperAdmin {
		maxAssignable = domain.RoleAdmin
	}
	if !newRole.AtLeast(domain.RoleCommunity) || newRole.AtLeast(nextRole(maxAssignable)) {
		return fmt.Errorf("cannot assign role %s with role %s", newRole, callerRole)
	}

	u, err := uc.users.GetByID(ctx, targetUserID)
	if err != nil {
		return err
	}
	u.Role = newRole
	return uc.users.Update(ctx, u)
}

func (uc *AdminUserUseCase) SetSquad(ctx context.Context, targetUserID, squadID string) error {
	u, err := uc.users.GetByID(ctx, targetUserID)
	if err != nil {
		return err
	}
	u.SquadID = &squadID
	return uc.users.Update(ctx, u)
}

func (uc *AdminUserUseCase) SetBan(ctx context.Context, targetUserID string, banned bool) error {
	u, err := uc.users.GetByID(ctx, targetUserID)
	if err != nil {
		return err
	}
	u.IsBanned = banned
	return uc.users.Update(ctx, u)
}

// ── Invitation use case ───────────────────────────────────────────────────────

type InvitationUseCase struct {
	invitations domain.InvitationRepository
}

func NewInvitationUseCase(invitations domain.InvitationRepository) *InvitationUseCase {
	return &InvitationUseCase{invitations: invitations}
}

func (uc *InvitationUseCase) Create(ctx context.Context, email, createdBy string) (*domain.Invitation, error) {
	buf := make([]byte, 32)
	if _, err := rand.Read(buf); err != nil {
		return nil, fmt.Errorf("generate token: %w", err)
	}
	token := hex.EncodeToString(buf)

	inv := &domain.Invitation{
		Email:     email,
		Token:     token,
		CreatedBy: &createdBy,
		ExpiresAt: time.Now().Add(72 * time.Hour),
	}
	return uc.invitations.Create(ctx, inv)
}

func (uc *InvitationUseCase) Validate(ctx context.Context, token string) (*domain.Invitation, error) {
	inv, err := uc.invitations.GetByToken(ctx, token)
	if err != nil {
		return nil, err
	}
	if inv.UsedAt != nil {
		return nil, fmt.Errorf("invitation already used")
	}
	if time.Now().After(inv.ExpiresAt) {
		return nil, fmt.Errorf("invitation expired")
	}
	return inv, nil
}

func (uc *InvitationUseCase) MarkUsed(ctx context.Context, token string) error {
	return uc.invitations.MarkUsed(ctx, token)
}

func (uc *InvitationUseCase) List(ctx context.Context) ([]*domain.Invitation, error) {
	return uc.invitations.List(ctx)
}

// nextRole returns the role one level above r (used for permission ceiling checks).
func nextRole(r domain.Role) domain.Role {
	switch r {
	case domain.RoleCommunity:
		return domain.RoleSquadMember
	case domain.RoleSquadMember:
		return domain.RoleSquadLead
	case domain.RoleSquadLead:
		return domain.RoleAdmin
	case domain.RoleAdmin:
		return domain.RoleSuperAdmin
	default:
		return domain.RoleSuperAdmin
	}
}
