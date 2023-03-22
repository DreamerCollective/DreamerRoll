/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Die = "die",
	Modifier = "modifier",
	Roll = "roll",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type DieRecord = {
	diefaces: number
	rawresult?: number
}

export type ModifierRecord = {
	modifiername: string
	modifiernumber: number
}

export type RollRecord = {
	result?: number
	die?: RecordIdString[]
	modifier?: RecordIdString[]
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type DieResponse = DieRecord & BaseSystemFields
export type ModifierResponse = ModifierRecord & BaseSystemFields
export type RollResponse<Texpand = unknown> = RollRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	die: DieRecord
	modifier: ModifierRecord
	roll: RollRecord
	users: UsersRecord
}

export type CollectionResponses = {
	die: DieResponse
	modifier: ModifierResponse
	roll: RollResponse
	users: UsersResponse
}