const config = {
  screens: {
    AuthNav: {
      path: "auth",
      initialRouteName: "Workouts",
      screens: {
        Create: {
          path: "create",
          initialRouteName: "NewWorkout",
          screens: { NewWorkout: "newworkout", NewExercises: "newexercises" },
        },
        Workouts: {
          path: "workouts",
          initialRouteName: "WorkoutsList",
          screens: { WorkoutsList: "list", Exercises: "exercises" },
        },
        Settings: "settings",
      },
    },
    NoAuthNav: {
      path: "noauth",
      initialRouteName: "Login",
      screens: { Login: "login", Register: "register", Forgot: "forgot" },
    },
    DeleteMe: "deleteme",
    NotFound: "*",
  },
};

export default config;
