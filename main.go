package main

import (
	"encoding/json"
	"fmt"
	"log"
	//"io/ioutil"
	"net/http"
	//"strconv"
	"flag"
	"github.com/gorilla/mux"
	"github.com/talbor49/HoneyBeeClient"
)

type handlerError struct {
	Error   error
	Message string
	Code    int
}

type handler func(w http.ResponseWriter, r *http.Request) (interface{}, *handlerError)

func (fn handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	response, err := fn(w, r)
	if err != nil {
		log.Printf("ERROR: %v\n", err.Error)
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Message), err.Code)
		return
	}

	if response == nil {
		log.Printf("ERROR: response from method is nil\n")
		http.Error(w, "Internal server error. Check the logs", http.StatusInternalServerError)
		return
	}

	bytes, e := json.Marshal(response)
	if e != nil {
		http.Error(w, "Error marshalling JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	log.Printf("%s %s %s %d", r.RemoteAddr, r.Method, r.URL, 200)
}

func main() {
	port := flag.Int("port", 8080, "port to serve on")
	flag.Parse()

	router := mux.NewRouter()
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/home.html")

	})

	http.Handle("/", router)
	log.Printf("Running on port %d\n", *port)

	addr := fmt.Sprintf("127.0.0.1:%d", *port)
	conn := HoneyBeeClient.Connect("127.0.0.1", 4590)
	conn.Authenticate("daniel", "123")
	conn.UseBucket("myBucket")
	conn.Set("foo", "bar", "")
	log.Printf(conn.Get("foo", ""))
	err := http.ListenAndServe(addr, nil)
	fmt.Println(err.Error())

}
