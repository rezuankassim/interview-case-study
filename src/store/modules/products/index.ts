import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from 'vuex'
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store'
import { state } from './state'
import type { State } from './state'
// eslint-disable-next-line import/no-cycle
import { mutations, Mutations } from './mutations'
// eslint-disable-next-line import/no-cycle
import { actions, Actions } from './actions'

export { State }

export type ProductStore<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  actions,
}
