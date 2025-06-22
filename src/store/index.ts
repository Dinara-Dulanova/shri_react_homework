import { create } from 'zustand'
import { createGenerationSlice } from './generate'
import { createAnalyzeSlice } from './analyze/analyze'
import type { IAnalyzeState } from './analyze/analyze'
import type { IGenerationState } from './generate'

export type RootStoreState = IAnalyzeState & IGenerationState

export type RootStore = {
    generate: IGenerationState
    analyze: IAnalyzeState
}

export const useStore = create<RootStoreState>((...stateTools) => ({
    ...createGenerationSlice(stateTools[0]),
    ...createAnalyzeSlice(stateTools[0], stateTools[1]),
}))
