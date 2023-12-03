import { Step } from 'react-joyride';

export interface JoyrideState {
    run: boolean;
    stepIndex: number;
    steps: Step[];
    tourActive: boolean;
}