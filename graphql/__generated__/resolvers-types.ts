import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Adjacency = {
  __typename?: 'Adjacency';
  destinations: Array<Vertex>;
  source: Vertex;
};

export type AdjacencyInput = {
  vertex: Scalars['String'];
  vertices: Array<Scalars['String']>;
};

export type AdjacencyListInput = {
  vertices: Array<AdjacencyInput>;
};

export type AdjacencyMatrixColumn = {
  __typename?: 'AdjacencyMatrixColumn';
  vertex: Vertex;
  vertices: Array<AdjacencyMatrixRow>;
};

export type AdjacencyMatrixColumnInput = {
  vertex: Scalars['String'];
  vertices: Array<AdjacencyMatrixRowInput>;
};

export type AdjacencyMatrixInput = {
  vertices: Array<AdjacencyMatrixColumnInput>;
};

export type AdjacencyMatrixRow = {
  __typename?: 'AdjacencyMatrixRow';
  has_edge: Scalars['Boolean'];
  vertex: Vertex;
};

export type AdjacencyMatrixRowInput = {
  has_edge: Scalars['Boolean'];
  vertex: Scalars['String'];
};

export type DefaultGraphInput = {
  edges: Array<EdgeInput>;
  vertices: Array<Scalars['String']>;
};

export type Edge = {
  __typename?: 'Edge';
  destination_vertex_id?: Maybe<Scalars['String']>;
  destination_vertex_name?: Maybe<Scalars['String']>;
  source_vertex_id?: Maybe<Scalars['String']>;
  source_vertex_name?: Maybe<Scalars['String']>;
};

export type EdgeInput = {
  destination: Scalars['String'];
  source: Scalars['String'];
};

export type Element = {
  __typename?: 'Element';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  set_id?: Maybe<Scalars['String']>;
};

export type Graph = {
  __typename?: 'Graph';
  adjacency_list?: Maybe<Array<Adjacency>>;
  adjacency_matrix?: Maybe<Array<AdjacencyMatrixColumn>>;
  edges?: Maybe<Array<Edge>>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  vertices?: Maybe<Array<Vertex>>;
};

export type GraphInput = {
  adjacency_list?: InputMaybe<AdjacencyListInput>;
  adjacency_matrix?: InputMaybe<AdjacencyMatrixInput>;
  default?: InputMaybe<DefaultGraphInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGraph?: Maybe<SuccessResponse>;
  addSet?: Maybe<SuccessResponse>;
};


export type MutationAddGraphArgs = {
  graph: GraphInput;
  name: Scalars['String'];
};


export type MutationAddSetArgs = {
  elements?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  graph?: Maybe<Graph>;
  graphs?: Maybe<Array<Graph>>;
  set?: Maybe<Set>;
  sets?: Maybe<Array<Set>>;
};


export type QueryGraphArgs = {
  id: Scalars['String'];
};


export type QuerySetArgs = {
  id: Scalars['String'];
};

export type Set = {
  __typename?: 'Set';
  elements?: Maybe<Array<Element>>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Vertex = {
  __typename?: 'Vertex';
  graph_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Adjacency: ResolverTypeWrapper<Adjacency>;
  AdjacencyInput: AdjacencyInput;
  AdjacencyListInput: AdjacencyListInput;
  AdjacencyMatrixColumn: ResolverTypeWrapper<AdjacencyMatrixColumn>;
  AdjacencyMatrixColumnInput: AdjacencyMatrixColumnInput;
  AdjacencyMatrixInput: AdjacencyMatrixInput;
  AdjacencyMatrixRow: ResolverTypeWrapper<AdjacencyMatrixRow>;
  AdjacencyMatrixRowInput: AdjacencyMatrixRowInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DefaultGraphInput: DefaultGraphInput;
  Edge: ResolverTypeWrapper<Edge>;
  EdgeInput: EdgeInput;
  Element: ResolverTypeWrapper<Element>;
  Graph: ResolverTypeWrapper<Graph>;
  GraphInput: GraphInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Set: ResolverTypeWrapper<Set>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SuccessResponse: ResolverTypeWrapper<SuccessResponse>;
  Vertex: ResolverTypeWrapper<Vertex>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Adjacency: Adjacency;
  AdjacencyInput: AdjacencyInput;
  AdjacencyListInput: AdjacencyListInput;
  AdjacencyMatrixColumn: AdjacencyMatrixColumn;
  AdjacencyMatrixColumnInput: AdjacencyMatrixColumnInput;
  AdjacencyMatrixInput: AdjacencyMatrixInput;
  AdjacencyMatrixRow: AdjacencyMatrixRow;
  AdjacencyMatrixRowInput: AdjacencyMatrixRowInput;
  Boolean: Scalars['Boolean'];
  DefaultGraphInput: DefaultGraphInput;
  Edge: Edge;
  EdgeInput: EdgeInput;
  Element: Element;
  Graph: Graph;
  GraphInput: GraphInput;
  Mutation: {};
  Query: {};
  Set: Set;
  String: Scalars['String'];
  SuccessResponse: SuccessResponse;
  Vertex: Vertex;
}>;

export type AdjacencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Adjacency'] = ResolversParentTypes['Adjacency']> = ResolversObject<{
  destinations?: Resolver<Array<ResolversTypes['Vertex']>, ParentType, ContextType>;
  source?: Resolver<ResolversTypes['Vertex'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdjacencyMatrixColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdjacencyMatrixColumn'] = ResolversParentTypes['AdjacencyMatrixColumn']> = ResolversObject<{
  vertex?: Resolver<ResolversTypes['Vertex'], ParentType, ContextType>;
  vertices?: Resolver<Array<ResolversTypes['AdjacencyMatrixRow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdjacencyMatrixRowResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdjacencyMatrixRow'] = ResolversParentTypes['AdjacencyMatrixRow']> = ResolversObject<{
  has_edge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  vertex?: Resolver<ResolversTypes['Vertex'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = ResolversObject<{
  destination_vertex_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destination_vertex_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source_vertex_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source_vertex_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  set_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['Graph'] = ResolversParentTypes['Graph']> = ResolversObject<{
  adjacency_list?: Resolver<Maybe<Array<ResolversTypes['Adjacency']>>, ParentType, ContextType>;
  adjacency_matrix?: Resolver<Maybe<Array<ResolversTypes['AdjacencyMatrixColumn']>>, ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<ResolversTypes['Edge']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vertices?: Resolver<Maybe<Array<ResolversTypes['Vertex']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addGraph?: Resolver<Maybe<ResolversTypes['SuccessResponse']>, ParentType, ContextType, RequireFields<MutationAddGraphArgs, 'graph' | 'name'>>;
  addSet?: Resolver<Maybe<ResolversTypes['SuccessResponse']>, ParentType, ContextType, RequireFields<MutationAddSetArgs, 'name'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  graph?: Resolver<Maybe<ResolversTypes['Graph']>, ParentType, ContextType, RequireFields<QueryGraphArgs, 'id'>>;
  graphs?: Resolver<Maybe<Array<ResolversTypes['Graph']>>, ParentType, ContextType>;
  set?: Resolver<Maybe<ResolversTypes['Set']>, ParentType, ContextType, RequireFields<QuerySetArgs, 'id'>>;
  sets?: Resolver<Maybe<Array<ResolversTypes['Set']>>, ParentType, ContextType>;
}>;

export type SetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Set'] = ResolversParentTypes['Set']> = ResolversObject<{
  elements?: Resolver<Maybe<Array<ResolversTypes['Element']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessResponse'] = ResolversParentTypes['SuccessResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vertex'] = ResolversParentTypes['Vertex']> = ResolversObject<{
  graph_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Adjacency?: AdjacencyResolvers<ContextType>;
  AdjacencyMatrixColumn?: AdjacencyMatrixColumnResolvers<ContextType>;
  AdjacencyMatrixRow?: AdjacencyMatrixRowResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  Element?: ElementResolvers<ContextType>;
  Graph?: GraphResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Set?: SetResolvers<ContextType>;
  SuccessResponse?: SuccessResponseResolvers<ContextType>;
  Vertex?: VertexResolvers<ContextType>;
}>;

