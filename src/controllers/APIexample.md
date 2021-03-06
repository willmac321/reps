```javascript
/*
* User {
    settings: User Details,
    Workouts : {uid:{workout:{..., exercises:{uuid:{exercise}}}}
* }
*/

users: {
  uid: {
    /*
    * Privacy Ack
    */
    privacyAck: {
      uid: true
    },

    /*
    * User Details
    */
    settings: {
      uid: {
        theme: 'light',
        splashScreenIcon: 'aphrodite',
        timeout: false,
        contactEmail: 'help@loblollysoftware.com',
      }
    },

    /*
    * Workout
    */
    workouts: {
      uid:{
        id: string
        title: string
        date: locale Date
        exercises: [
          string
        ]
      },
    },

    /*
    * Exercise
    */
    exercises: {
      uid: {
        id: string
        title: string,
        sets: int,
        repRange: [int, int],
        rest: int
      },
    },
  }
}
```;
