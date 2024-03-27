export const DUMMY_CAST = [
    {
        adult: false,
        gender: 2,
        id: 12898,
        known_for_department: "Acting",
        name: "Tim Allen",
        original_name: "Tim Allen",
        popularity: 2.744,
        profile_path: "/woWhZzFILVhYMAvsPL171HjMY0y.jpg",
        cast_id: 1,
        character: "Joe Scheffer",
        credit_id: "52fe44db9251416c7504353b",
        order: 0,
    },
    {
        adult: false,
        gender: 1,
        id: 31171,
        known_for_department: "Acting",
        name: "Julie Bowen",
        original_name: "Julie Bowen",
        popularity: 2.744,
        profile_path: "/fPEajDhMgM14105LxYkpEdQZlBt.jpg",
        cast_id: 2,
        character: "Meg Harper",
        credit_id: "52fe44db9251416c7504353f",
        order: 1,
    },
];

export const DUMMY_MOVIE_DETAILS = {
    adult: false,
    backdrop_path: "/3ZiuypiyAtyxTcjZjkK7aGjWRBa.jpg",
    belongs_to_collection: {
        id: 1,
        name: "Name",
        poster_path: "someUrl",
        backdrop_path: "string",
    },
    budget: 0,
    genres: [
        {
            id: 878,
            name: "Science Fiction",
        },
        {
            id: 28,
            name: "Action",
        },
    ],
    homepage: "",
    id: 11234,
    imdb_id: "tt0067525",
    original_language: "en",
    original_title: "The Omega Man",
    overview:
        "Due to an experimental vaccine, Dr. Robert Neville is the only human survivor of an apocalyptic war waged with biological weapons. Besides him, only a few hundred deformed, nocturnal people remain - sensitive to light, and homicidally psychotic.",
    popularity: 14.632,
    poster_path: "/pmtth3IKZnFevbDZAK1Whpxwxqq.jpg",
    production_companies: [
        {
            id: 19972,
            logo_path: "path",
            name: "Walter Seltzer Productions",
            origin_country: "",
        },
    ],
    production_countries: [
        {
            iso_3166_1: "US",
            name: "United States of America",
        },
    ],
    release_date: "1971-08-01",
    revenue: 8720000,
    runtime: 98,
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
        },
    ],
    status: "Released",
    tagline: "The last man alive... is not alone!",
    title: "The Omega Man",
    video: false,
    vote_average: 6.2,
    vote_count: 511,
};

export const DUMMY_SIMILAR_MOVIES = {
    results: [
        {
            adult: false,
            backdrop_path: "/v1QEIuBM1vvpvfqalahhIyXY0Cm.jpg",
            genre_ids: [12, 53, 28],
            id: 551,
            original_language: "en",
            original_title: "The Poseidon Adventure",
            overview:
                "When their ocean liner capsizes, a group of passengers struggle to survive and escape.",
            popularity: 28.545,
            poster_path: "/lIGloOrUtGDx6E4vUTGae9C1phJ.jpg",
            release_date: "1972-12-13",
            title: "The Poseidon Adventure",
            video: false,
            vote_average: 7.098,
            vote_count: 829,
        },
        {
            adult: false,
            backdrop_path: "/oIwfoUFfWfESn0Y8u8jv9lc8li1.jpg",
            genre_ids: [28, 53],
            id: 562,
            original_language: "en",
            original_title: "Die Hard",
            overview:
                "NYPD cop John McClane's plan to reconcile with his estranged wife is thrown for a serious loop when, minutes after he arrives at her office, the entire building is overtaken by a group of terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.",
            popularity: 41.646,
            poster_path: "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
            release_date: "1988-07-15",
            title: "Die Hard",
            video: false,
            vote_average: 7.784,
            vote_count: 10658,
        },
    ],
};

export const DUMMY_MOVIE_CREDITS = {
    id: 11234,
    cast: [
        {
            adult: false,
            gender: 2,
            id: 10017,
            known_for_department: "Acting",
            name: "Charlton Heston",
            original_name: "Charlton Heston",
            popularity: 2.744,
            profile_path: "/mJabHWZrjlFiF8U8Bbr8lSFtLX6.jpg",
            cast_id: 1,
            character: "Robert Neville",
            credit_id: "52fe44169251416c75028741",
            order: 0,
        },
        {
            adult: false,
            gender: 2,
            id: 2516,
            known_for_department: "Acting",
            name: "Anthony Zerbe",
            original_name: "Anthony Zerbe",
            popularity: 2.744,
            profile_path: "/ctp83m2ntqbz69jOU8W5aU4sBtI.jpg",
            cast_id: 2,
            character: "Matthias",
            credit_id: "52fe44169251416c75028745",
            order: 1,
        },
    ],
};
