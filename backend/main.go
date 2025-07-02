package main

import (
	"encoding/json"
	"net/http"
)

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
	Role     string `json:"role"`
}

var users = []User{
	{ID: 1, Name: "Admin User", Email: "admin@example.com", Password: "adminpass", Role: "admin"},
	{ID: 2, Name: "Regular User", Email: "user@example.com", Password: "userpass", Role: "user"},
}

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var products = []Product{
	{ID: 1, Name: "Product A", Price: 10},
	{ID: 2, Name: "Product B", Price: 20},
	{ID: 3, Name: "Product C", Price: 30},
}

func main() {
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	})
	http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(products)
	})
	http.HandleFunc("/login", loginHandler)
	http.ListenAndServe(":8080", nil)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	var cred struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&cred); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	for _, u := range users {
		if u.Email == cred.Email && u.Password == cred.Password {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(struct {
				ID    int    `json:"id"`
				Name  string `json:"name"`
				Email string `json:"email"`
				Role  string `json:"role"`
			}{u.ID, u.Name, u.Email, u.Role})
			return
		}
	}
	w.WriteHeader(http.StatusUnauthorized)
}
