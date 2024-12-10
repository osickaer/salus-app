// store/slices/exercisesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exercise {
  exerciseName: string;
  strengthExerciseId: string;
  sets: { setNum: number; previous: string; reps: number; weight: number }[];
}

interface ExercisesState {
  temporaryExercises: Exercise[];
}

const initialState: ExercisesState = {
  temporaryExercises: [],
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.temporaryExercises.push(action.payload);
    },
    removeExercise: (state, action: PayloadAction<string>) => {
      state.temporaryExercises = state.temporaryExercises.filter(
        (exercise) => exercise.strengthExerciseId !== action.payload
      );
    },
    clearExercises: (state) => {
      state.temporaryExercises = [];
    },
  },
});

export const { addExercise, removeExercise, clearExercises } =
  exercisesSlice.actions;
export default exercisesSlice.reducer;
