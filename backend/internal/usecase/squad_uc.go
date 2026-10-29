package usecase

import (
	"context"
	"fmt"

	"focus-astu-hub/internal/domain"
)

type SquadUseCase struct {
	squads   domain.SquadRepository
	problems domain.ProblemRepository
}

func NewSquadUseCase(squads domain.SquadRepository, problems domain.ProblemRepository) *SquadUseCase {
	return &SquadUseCase{squads: squads, problems: problems}
}

func (uc *SquadUseCase) CreateTrack(ctx context.Context, callerSquadID, squadID, title string) (*domain.SquadTrack, error) {
	if callerSquadID != squadID {
		return nil, fmt.Errorf("forbidden: squad mismatch")
	}
	return uc.squads.CreateTrack(ctx, &domain.SquadTrack{SquadID: squadID, Title: title})
}

func (uc *SquadUseCase) UpdateTrack(ctx context.Context, callerSquadID, squadID, trackID, title string) (*domain.SquadTrack, error) {
	if callerSquadID != squadID {
		return nil, fmt.Errorf("forbidden: squad mismatch")
	}
	track, err := uc.squads.GetTrackByID(ctx, trackID)
	if err != nil {
		return nil, err
	}
	if track.SquadID != callerSquadID {
		return nil, fmt.Errorf("forbidden: track belongs to different squad")
	}
	return uc.squads.UpdateTrack(ctx, trackID, title)
}

func (uc *SquadUseCase) DeleteTrack(ctx context.Context, callerSquadID, squadID, trackID string) error {
	if callerSquadID != squadID {
		return fmt.Errorf("forbidden: squad mismatch")
	}
	track, err := uc.squads.GetTrackByID(ctx, trackID)
	if err != nil {
		return err
	}
	if track.SquadID != callerSquadID {
		return fmt.Errorf("forbidden: track belongs to different squad")
	}
	return uc.squads.DeleteTrack(ctx, trackID)
}

func (uc *SquadUseCase) GetCurriculum(ctx context.Context, squadID string) ([]*domain.SquadTrack, error) {
	tracks, err := uc.squads.GetTracks(ctx, squadID)
	if err != nil {
		return nil, err
	}

	for _, track := range tracks {
		topics, err := uc.squads.GetTopics(ctx, track.ID)
		if err != nil {
			return nil, err
		}
		for _, topic := range topics {
			problems, err := uc.squads.GetTopicProblems(ctx, topic.ID)
			if err != nil {
				return nil, err
			}
			topic.Problems = make([]domain.TopicProblem, len(problems))
			for i, p := range problems {
				topic.Problems[i] = *p
			}
		}
		track.Topics = make([]domain.SquadTopic, len(topics))
		for i, t := range topics {
			track.Topics[i] = *t
		}
	}
	return tracks, nil
}

func (uc *SquadUseCase) AddTopic(ctx context.Context, callerSquadID, trackID, title string) (*domain.SquadTopic, error) {
	track, err := uc.squads.GetTrackByID(ctx, trackID)
	if err != nil {
		return nil, err
	}
	if track.SquadID != callerSquadID {
		return nil, fmt.Errorf("forbidden: track belongs to different squad")
	}
	return uc.squads.CreateTopic(ctx, &domain.SquadTopic{TrackID: trackID, Title: title})
}

func (uc *SquadUseCase) UpdateTopic(ctx context.Context, callerSquadID, trackID, topicID, title string) (*domain.SquadTopic, error) {
	track, err := uc.squads.GetTrackByID(ctx, trackID)
	if err != nil {
		return nil, err
	}
	if track.SquadID != callerSquadID {
		return nil, fmt.Errorf("forbidden: track belongs to different squad")
	}
	topic, err := uc.squads.GetTopicByID(ctx, topicID)
	if err != nil {
		return nil, err
	}
	if topic.TrackID != trackID {
		return nil, fmt.Errorf("forbidden: topic belongs to different track")
	}
	return uc.squads.UpdateTopic(ctx, topicID, title)
}

func (uc *SquadUseCase) DeleteTopic(ctx context.Context, callerSquadID, trackID, topicID string) error {
	track, err := uc.squads.GetTrackByID(ctx, trackID)
	if err != nil {
		return err
	}
	if track.SquadID != callerSquadID {
		return fmt.Errorf("forbidden: track belongs to different squad")
	}
	topic, err := uc.squads.GetTopicByID(ctx, topicID)
	if err != nil {
		return err
	}
	if topic.TrackID != trackID {
		return fmt.Errorf("forbidden: topic belongs to different track")
	}
	return uc.squads.DeleteTopic(ctx, topicID)
}

func (uc *SquadUseCase) AssignProblem(ctx context.Context, callerSquadID, topicID, problemID string) error {
	topic, err := uc.squads.GetTopicByID(ctx, topicID)
	if err != nil {
		return err
	}
	track, err := uc.squads.GetTrackByID(ctx, topic.TrackID)
	if err != nil {
		return err
	}
	if track.SquadID != callerSquadID {
		return fmt.Errorf("forbidden: topic belongs to different squad")
	}
	// Verify problem exists
	if _, err := uc.problems.GetByID(ctx, problemID); err != nil {
		return fmt.Errorf("problem not found")
	}
	return uc.squads.AssignProblem(ctx, topicID, problemID)
}

func (uc *SquadUseCase) UnassignProblem(ctx context.Context, callerSquadID, topicID, problemID string) error {
	topic, err := uc.squads.GetTopicByID(ctx, topicID)
	if err != nil {
		return err
	}
	track, err := uc.squads.GetTrackByID(ctx, topic.TrackID)
	if err != nil {
		return err
	}
	if track.SquadID != callerSquadID {
		return fmt.Errorf("forbidden: topic belongs to different squad")
	}
	return uc.squads.DeleteTopicProblem(ctx, topicID, problemID)
}

func (uc *SquadUseCase) ListSquads(ctx context.Context) ([]*domain.Squad, error) {
	return uc.squads.ListAll(ctx)
}
