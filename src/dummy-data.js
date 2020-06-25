export default {
    "users": [
        {
            "id": 1,
            "email": "demo@demo.com",
            "username": "demo",
            "password": "password"
        },
    ],

    "locations": [
        {
            "id": 1,
            "user_id": 1,
            "location_name": "The New"
        },
        {
            "id": 2,
            "user_id": 1,
            "location_name": "Catoctin"
        },
    ],

    "problems": [
        {
            "id": 1,
            "location_id": 2,
            "problem_name": "Belly Up",
            "grade": "V4",
            "area": "Jonah Boulder",
            "notes": "knee scum",
            "sent": false,
        },
        {
            "id": 2,
            "location_id": 2,
            "problem_name": "Dish Right",
            "grade": "V4",
            "area": "Jonah Boulder",
            "notes": "skip first few crimps to good crimp?",
            "sent": false
        },
        {
            "id": 3,
            "location_id": 2,
            "problem_name": "The Pigman",
            "grade": "V3",
            "area": "Hog Rock",
            "notes": "find feet ahead of time",
            "sent": true,
        },
        {
            "id": 4,
            "location_id": 1,
            "problem_name": "Doctor",
            "grade": "V2",
            "area": "",
            "notes": "",
            "sent": true,
        },
        {
            "id": 5,
            "location_id": 1,
            "problem_name": "I Love Luci",
            "grade": "V3",
            "area": "",
            "notes": "use feet",
            "sent": true,
        }
    ]
}