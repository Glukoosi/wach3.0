package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/auth"
)

func main() {
	app := pocketbase.NewWithConfig(&pocketbase.Config{DefaultDebug: false})

	app.OnAfterBootstrap().Add(func(e *core.BootstrapEvent) error {
		app.Dao().DB().NewQuery(`
			CREATE UNIQUE INDEX ownership_profile_wachievement ON completedWachievements (profile, wachievement);
		`).Execute()
		return nil
	})

	app.OnRecordAuthRequest().Add(func(e *core.RecordAuthEvent) error {
		meta, ok := e.Meta.(*auth.AuthUser)
		if !ok {
			return nil // doesn't have OAuth2 metadata
		}

		record, err := app.Dao().FindFirstRecordByData("userProfiles", "user", e.Record.Id)
		if err != nil {
			if err.Error() == "sql: no rows in result set" {
				collection, err := app.Dao().FindCollectionByNameOrId("userProfiles")
				if err != nil {
					return err
				}
				record = models.NewRecord(collection)
			} else {
				return err
			}
		}

		form := forms.NewRecordUpsert(app, record)

		if meta.Name != e.Record.GetString("name") || meta.AvatarUrl != e.Record.GetString("avatarUrl") {
			form.LoadData(map[string]any{
				"user":      e.Record.Id,
				"userName":  meta.Name,
				"avatarUrl": meta.AvatarUrl,
			})
			// validate and submit (internally it calls app.Dao().SaveRecord(record) in a transaction)
			if err := form.Submit(); err != nil {
				return err
			}
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
