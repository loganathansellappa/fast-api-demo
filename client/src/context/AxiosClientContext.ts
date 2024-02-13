import axios from 'axios'
import { createContext, useContext } from 'react'

const Context = createContext<AxiosClientService | undefined>(undefined)
export const AxiosClientProvider = Context.Provider

export const useAxiosClient = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useAxiosClient must be used within a AxiosClientProvider')
  }
  return context
}

export class AxiosClientService {
  public axiosClient: ReturnType<typeof axios.create>
  private endpoint: string

  constructor({ endpoint }: { endpoint?: string; token?: string }) {
    this.endpoint = `${endpoint}`

    this.axiosClient = axios.create({
      baseURL: this.endpoint,
    })
  }
}
