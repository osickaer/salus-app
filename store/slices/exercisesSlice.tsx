// store/slices/exercisesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exercise {
  instanceId: string; // Unique identifier for each exercise instance
  strengthExerciseId: string;
  exerciseName: string;
  sets: {
    setNum: number;
    previous: string;
    reps: string; // Allow string values for initialization
    weight: string; // Allow string values for initialization
  }[];
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
        (exercise) => exercise.instanceId !== action.payload
      );
    },
    clearExercises: (state) => {
      state.temporaryExercises = [];
    },
    addSet: (
      state,
      action: PayloadAction<{ instanceId: string; newSet: any }>
    ) => {
      const { instanceId, newSet } = action.payload;
      const exercise = state.temporaryExercises.find(
        (e) => e.instanceId === instanceId
      );
      if (exercise) {
        exercise.sets.push(newSet);
      }
    },
    removeSet: (
      state,
      action: PayloadAction<{ instanceId: string; setNum: number }>
    ) => {
      const { instanceId, setNum } = action.payload;
      const exercise = state.temporaryExercises.find(
        (e) => e.instanceId === instanceId
      );
      if (exercise) {
        exercise.sets = exercise.sets
          .filter((set) => set.setNum !== setNum)
          .map((set, index) => ({ ...set, setNum: index + 1 }));
      }
    },
    updateSet: (
      state,
      action: PayloadAction<{
        instanceId: string;
        setNum: number;
        reps?: string;
        weight?: string;
      }>
    ) => {
      const { instanceId, setNum, reps, weight } = action.payload;
      const exercise = state.temporaryExercises.find(
        (e) => e.instanceId === instanceId
      );
      if (exercise) {
        const set = exercise.sets.find((s) => s.setNum === setNum);
        if (set) {
          if (reps !== undefined) set.reps = reps;
          if (weight !== undefined) set.weight = weight;
        }
      }
    },
  },
});

export const {
  addExercise,
  removeExercise,
  clearExercises,
  addSet,
  removeSet,
  updateSet,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;
