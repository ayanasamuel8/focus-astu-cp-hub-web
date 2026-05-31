package usecase

import (
	"context"
	"fmt"

	"focus-astu-hub/internal/domain"
)

type AnnouncementUseCase struct {
	announcements domain.AnnouncementRepository
}

func NewAnnouncementUseCase(announcements domain.AnnouncementRepository) *AnnouncementUseCase {
	return &AnnouncementUseCase{announcements: announcements}
}

func (uc *AnnouncementUseCase) ListPublic(ctx context.Context, limit int) ([]*domain.Announcement, error) {
	return uc.announcements.ListPublic(ctx, limit)
}

func (uc *AnnouncementUseCase) ListForUser(ctx context.Context, squadID *string) ([]*domain.Announcement, error) {
	return uc.announcements.ListForUser(ctx, squadID)
}

func (uc *AnnouncementUseCase) PostGlobal(ctx context.Context, authorID, title, body string) (*domain.Announcement, error) {
	return uc.announcements.Create(ctx, &domain.Announcement{
		AuthorID: authorID,
		SquadID:  nil,
		Title:    title,
		Body:     body,
	})
}

func (uc *AnnouncementUseCase) PostSquad(ctx context.Context, authorID, squadID, title, body string, callerSquadID *string) (*domain.Announcement, error) {
	// Squad-scoped announcements can only be posted to the caller's own squad by a squad lead
	if callerSquadID == nil || *callerSquadID != squadID {
		return nil, fmt.Errorf("forbidden: can only post to your own squad")
	}
	return uc.announcements.Create(ctx, &domain.Announcement{
		AuthorID: authorID,
		SquadID:  &squadID,
		Title:    title,
		Body:     body,
	})
}
