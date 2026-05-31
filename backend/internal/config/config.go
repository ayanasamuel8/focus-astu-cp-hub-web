package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                   string
	DatabaseURL            string
	SupabaseURL            string
	JWKSUrl                string
	SupabaseServiceRoleKey string
	SiteURL                string
}

func Load() (*Config, error) {
	_ = godotenv.Load()

	supabaseURL := strings.TrimRight(os.Getenv("SUPABASE_URL"), "/")

	cfg := &Config{
		Port:                   getEnv("PORT", "8080"),
		DatabaseURL:            os.Getenv("DATABASE_URL"),
		SupabaseURL:            supabaseURL,
		JWKSUrl:                supabaseURL + "/auth/v1/.well-known/jwks.json",
		SupabaseServiceRoleKey: os.Getenv("SUPABASE_SERVICE_ROLE_KEY"),
		SiteURL:                strings.TrimRight(getEnv("SITE_URL", "https://focus-astu-cp-hub-web.onrender.com"), "/"),
	}

	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}
	if cfg.SupabaseURL == "" {
		return nil, fmt.Errorf("SUPABASE_URL is required")
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
