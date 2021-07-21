import RestApiClient from "./rest-client";
import {HOST} from "./hosts";

const endpoint = {
    allCategories: "/categories",
    jokesCategory: "/random",
}

function getJokes(category, callback) {
	let request = new Request(HOST.jokes_api + endpoint.jokesCategory + "?category=" + category, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	RestApiClient.performRequest(request, callback);
}

function getAllCategories(params, callback) {
	let request = new Request(HOST.jokes_api + endpoint.allCategories, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	RestApiClient.performRequest(request, callback);
}

export {
    getJokes, getAllCategories
}