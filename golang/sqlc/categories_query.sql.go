// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: categories_query.sql

package sqlc

import (
	"context"
)

const createCategories = `-- name: CreateCategories :one
INSERT INTO categories (name) VALUES ($1) RETURNING id, name, created_at
`

func (q *Queries) CreateCategories(ctx context.Context, name string) (Category, error) {
	row := q.db.QueryRow(ctx, createCategories, name)
	var i Category
	err := row.Scan(&i.ID, &i.Name, &i.CreatedAt)
	return i, err
}

const deleteCategories = `-- name: DeleteCategories :exec

DELETE FROM categories WHERE id = $1
`

func (q *Queries) DeleteCategories(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteCategories, id)
	return err
}

const getSongCategories = `-- name: GetSongCategories :many
SELECT id, name, created_at FROM categories
`

func (q *Queries) GetSongCategories(ctx context.Context) ([]Category, error) {
	rows, err := q.db.Query(ctx, getSongCategories)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Category{}
	for rows.Next() {
		var i Category
		if err := rows.Scan(&i.ID, &i.Name, &i.CreatedAt); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateCategories = `-- name: UpdateCategories :one

UPDATE categories 
SET name = $1 
WHERE id = $2
RETURNING id, name, created_at
`

type UpdateCategoriesParams struct {
	Name string `json:"name"`
	ID   int32  `json:"id"`
}

func (q *Queries) UpdateCategories(ctx context.Context, arg UpdateCategoriesParams) (Category, error) {
	row := q.db.QueryRow(ctx, updateCategories, arg.Name, arg.ID)
	var i Category
	err := row.Scan(&i.ID, &i.Name, &i.CreatedAt)
	return i, err
}
