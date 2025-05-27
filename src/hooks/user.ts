import UserServices from "@/services/userServices"
import useSWR from "swr"

export const useUsers = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR('/user', UserServices.getAllUser)

    return {
        users: data?.data?.data || [],
        isLoading,
        isValidating,
        error,
        mutate
    }
}