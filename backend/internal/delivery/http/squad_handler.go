package http

import (
	"net/http"
	"strings"

	"focus-astu-hub/internal/usecase"

	"github.com/labstack/echo/v4"
)

type SquadHandler struct {
	squads *usecase.SquadUseCase
}

func NewSquadHandler(squads *usecase.SquadUseCase) *SquadHandler {
	return &SquadHandler{squads: squads}
}

func (h *SquadHandler) GetCurriculum(c echo.Context) error {
	squadID := c.Param("squadID")
	curriculum, err := h.squads.GetCurriculum(c.Request().Context(), squadID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch curriculum")
	}
	return c.JSON(http.StatusOK, curriculum)
}

func (h *SquadHandler) CreateTrack(c echo.Context) error {
	squadID := c.Param("squadID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	var body struct {
		Title string `json:"title"`
	}
	if err := c.Bind(&body); err != nil || strings.TrimSpace(body.Title) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "title is required")
	}

	track, err := h.squads.CreateTrack(c.Request().Context(), csid, squadID, strings.TrimSpace(body.Title))
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, track)
}

func (h *SquadHandler) UpdateTrack(c echo.Context) error {
	squadID := c.Param("squadID")
	trackID := c.Param("trackID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	var body struct {
		Title string `json:"title"`
	}
	if err := c.Bind(&body); err != nil || strings.TrimSpace(body.Title) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "title is required")
	}

	track, err := h.squads.UpdateTrack(c.Request().Context(), csid, squadID, trackID, strings.TrimSpace(body.Title))
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, track)
}

func (h *SquadHandler) DeleteTrack(c echo.Context) error {
	squadID := c.Param("squadID")
	trackID := c.Param("trackID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	err := h.squads.DeleteTrack(c.Request().Context(), csid, squadID, trackID)
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *SquadHandler) AddTopic(c echo.Context) error {
	trackID := c.Param("trackID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	var body struct {
		Title string `json:"title"`
	}
	if err := c.Bind(&body); err != nil || strings.TrimSpace(body.Title) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "title is required")
	}

	topic, err := h.squads.AddTopic(c.Request().Context(), csid, trackID, strings.TrimSpace(body.Title))
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, topic)
}

func (h *SquadHandler) UpdateTopic(c echo.Context) error {
	trackID := c.Param("trackID")
	topicID := c.Param("topicID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	var body struct {
		Title string `json:"title"`
	}
	if err := c.Bind(&body); err != nil || strings.TrimSpace(body.Title) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "title is required")
	}

	topic, err := h.squads.UpdateTopic(c.Request().Context(), csid, trackID, topicID, strings.TrimSpace(body.Title))
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, topic)
}

func (h *SquadHandler) DeleteTopic(c echo.Context) error {
	trackID := c.Param("trackID")
	topicID := c.Param("topicID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	err := h.squads.DeleteTopic(c.Request().Context(), csid, trackID, topicID)
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *SquadHandler) AssignProblem(c echo.Context) error {
	topicID := c.Param("topicID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	var body struct {
		ProblemID string `json:"problem_id"`
	}
	if err := c.Bind(&body); err != nil || strings.TrimSpace(body.ProblemID) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "problem_id is required")
	}

	if err := h.squads.AssignProblem(c.Request().Context(), csid, topicID, strings.TrimSpace(body.ProblemID)); err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, map[string]string{"status": "assigned"})
}

func (h *SquadHandler) UnassignProblem(c echo.Context) error {
	topicID := c.Param("topicID")
	problemID := c.Param("problemID")
	callerSquadID := SquadIDFromContext(c)
	csid := ""
	if callerSquadID != nil {
		csid = *callerSquadID
	}

	err := h.squads.UnassignProblem(c.Request().Context(), csid, topicID, problemID)
	if err != nil {
		if strings.HasPrefix(err.Error(), "forbidden") {
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		}
		if strings.Contains(err.Error(), "not found") {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}
