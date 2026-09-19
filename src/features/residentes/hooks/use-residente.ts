import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { residenteApi } from '../api/residente-api'

export function useResidenteSummary() { return useQuery({ queryKey: ['residente-summary'], queryFn: residenteApi.summary }) }
export function useFeedbackResidente() { return useQuery({ queryKey: ['feedback-residente'], queryFn: residenteApi.feedback }) }
export function useCrearFeedback() { const client = useQueryClient(); return useMutation({ mutationFn: residenteApi.crearFeedback, onSuccess: () => client.invalidateQueries({ queryKey: ['feedback-residente'] }) }) }