export type DimensionCode='D1'|'D2'|'D3'|'D4'|'D5'|'D6';
export type DimensionScores=Partial<Record<DimensionCode,number|null>>;
export type HardGate={code:string,triggered:boolean};
export const DIMENSION_WEIGHTS:Record<DimensionCode,number>={D1:.15,D2:.20,D3:.20,D4:.20,D5:.15,D6:.10};
export const IQP_WEIGHTS={E:.40,C:.20,F:.15,Co:.15,T:.10};
export function weightedMean(values:DimensionScores,renormalizeNA=true){let num=0,den=0;for(const [d,w] of Object.entries(DIMENSION_WEIGHTS) as [DimensionCode,number][]){const v=values[d];if(v===null||v===undefined){if(renormalizeNA)continue;else return null;}num+=v*w;den+=w;}return den?num/den:null;}
export function calculateIQP(v:{E:number,C:number,F:number,Co:number,T:number}){return v.E*IQP_WEIGHTS.E+v.C*IQP_WEIGHTS.C+v.F*IQP_WEIGHTS.F+v.Co*IQP_WEIGHTS.Co+v.T*IQP_WEIGHTS.T;}
export function calculateScore(input:{dimensions:DimensionScores;iqp?:{E:number,C:number,F:number,Co:number,T:number};hardGates?:HardGate[];}){const blocked=input.hardGates?.some(x=>x.triggered)??false;const internal=weightedMean(input.dimensions,true);return {scorePass:blocked||internal===null?null:Math.round(internal),scoreInternal:internal,iqp:input.iqp?calculateIQP(input.iqp):null,blocked,hardGates:input.hardGates||[]};}
