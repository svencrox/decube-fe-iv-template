import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
}

export default function Home({ data }: any) {
	const [movies, setMovies] = useState<Movie[]>([]);

	async function movieListHandler() {
		const url =
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWZmMTlkNmU2NTQ5YzRlNTA0Y2NkZjhmZTI0MTc2YiIsInN1YiI6IjY0YjkwNzRhNmFhOGUwMDE1MDRiZWUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.25tU4t19o9Ce8e-TOszBNV5chtj_7gDflwDTlSCLFlo",
			},
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}
			const data = await response.json();
			setMovies(data.results);
			return { props: { movies: data.results } };
		} catch (error) {
			console.error("Error fetching movies:", error);
			return { props: { movies: [] } };
		}
	}

	return (
		<main
			className={cn(
				"min-h-screen flex flex-col items-center p-2 mt-5 gap-4",
				inter.className
			)}
		>
			<div className='flex flex-col gap-2'>
				<p className='font-bold'>List of Popular Movies</p>
				<button
					className='bg-white text-black px-2 py-1 rounded-md hover:bg-slate-400'
					onClick={movieListHandler}
				>
					List Popular Movies
				</button>
			</div>
			<div className='grid grid-cols-1 bg-white'>
				<p>{data}</p>
				{movies.map((movie) => (
					<div
						key={movie.id}
						className='border p-2 rounded-md shadow-md flex items-center gap-4'
					>
						<h2 className='font-semibold text-black'>
							{movie.title}
						</h2>
						<p className='text-sm text-black'>{movie.overview}</p>
						{movie.poster_path && (
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								className='w-auto h-auto mt-2 rounded-md'
							/>
						)}
					</div>
				))}
			</div>
		</main>
	);
}
