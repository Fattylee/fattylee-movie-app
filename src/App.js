import React from "react";
import { Header } from "./components/Header/Header";
import { MovieList } from "./components/MovieList";

export const App = () => {
  const movies = Array(20)
    .fill({
      id: 1,
      title: "title monter monters montersmonters",
      poster_path: "xyz",
      vote_average: 8.7,
      overview: `I love abu ipsum dolor sit amet consectetur adipisici        elit. Id laboriosam, totam, nam doloribus alias amet odio reprehenderitk        adipisci, laborum at aut optio enim! Perferendis laboriosam quam itaque
        quis illo. Eaque voluptas reiciendis odit recusandae dolore voluptatum
        consequuntur, enim iste modi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Id Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Id laboriosam, totam, nam doloribus alias amet odio reprehenderit
        adipisci, laborum at aut optio enim! Perferendis laboriosam quam itaque
        quis illo. Eaque voluptas reiciendis odit recusandae dolore voluptatum
        consequuntur, enim iste modi. laboriosam, totam, nam doloribus alias
        consequuntur, enim iste modi. laboriosam, totam, nam doloribus alias
        consequuntur, enim iste modi. laboriosam, totam, nam doloribus alias
        amet odio reprehenderit adipisci, laborum at aut optio enim! Perferendis
        laboriosam quam itaque quis illo. Eaque voluptas reiciendis odit
        amet odio reprehenderit adipisci, laborum at aut optio enim! Perferendis
        laboriosam quam itaque quis illo. Eaque voluptas reiciendis odit
        amet odio reprehenderit adipisci, laborum at aut optio enim! Perferendis
        laboriosam quam itaque quis illo. Eaque voluptas reiciendis odit
        recusandae dolore voluptatum consequuntur, Ummu said the same`,
    })
    .map((m, index) => ({
      ...m,
      id: m.id + index,
      title: m.title + " " + (m.id + index),
    }));

  return (
    <div>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
};
