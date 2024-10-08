// This file was generated by the build script. Do not edit it manually.
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
	ContractEvent,
	ContractName,
	EntrypointName,
	ModuleReference,
} from "@concordium/web-sdk";
import { InitMethod, ReceiveMethod } from "../GenericContract";
export const CONTRACT_NAME = "rwa_compliance";
export type initRequest = {
	modules: Array<{ index: number; subindex: number }>;
};
export const initRequestSchemaBase64 = "FAABAAAABwAAAG1vZHVsZXMQAgw=";
export const initErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type AddAgentError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const addAgentErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type AddAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const addAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type AddModuleError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const addModuleErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type AddModuleRequest = { index: number; subindex: number };
export const addModuleRequestSchemaBase64 = "DA==";
export type AgentsError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const agentsErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type AgentsResponse = Array<
	{ Account: [string] } | { Contract: [{ index: number; subindex: number }] }
>;
export const agentsResponseSchemaBase64 =
	"EAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAM";
export type BurnedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const burnedErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type BurnedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const burnedRequestSchemaBase64 =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type CanTransferError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const canTransferErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type CanTransferRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	to:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const canTransferRequestSchemaBase64 =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0AAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type CanTransferResponse = boolean;
export const canTransferResponseSchemaBase64 = "AQ==";
export type IsAgentError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const isAgentErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type IsAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const isAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type IsAgentResponse = boolean;
export const isAgentResponseSchemaBase64 = "AQ==";
export type MintedError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const mintedErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type MintedRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	owner:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const mintedRequestSchemaBase64 =
	"FAADAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type ModulesResponse = Array<{ index: number; subindex: number }>;
export const modulesResponseSchemaBase64 = "EAIM";
export type RemoveAgentError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const removeAgentErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type RemoveAgentRequest =
	| { Account: [string] }
	| { Contract: [{ index: number; subindex: number }] };
export const removeAgentRequestSchemaBase64 =
	"FQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==";
export type RemoveModuleError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const removeModuleErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type RemoveModuleRequest = { index: number; subindex: number };
export const removeModuleRequestSchemaBase64 = "DA==";
export type SupportsError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const supportsErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type SupportsRequest = Array<string>;
export const supportsRequestSchemaBase64 = "EAEWAA==";
export type SupportsResponse = Array<
	| { NoSupport: Record<string, never> }
	| { Support: Record<string, never> }
	| { SupportBy: [Array<{ index: number; subindex: number }>] }
>;
export const supportsResponseSchemaBase64 =
	"EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM";
export type TransferredError =
	| { ParseError: Record<string, never> }
	| { LogError: Record<string, never> }
	| { InvalidModule: Record<string, never> }
	| { CallContractError: Record<string, never> }
	| { Unauthorized: Record<string, never> }
	| { AgentAlreadyExists: Record<string, never> }
	| { AgentNotFound: Record<string, never> };
export const transferredErrorSchemaBase64 =
	"FQcAAAAKAAAAUGFyc2VFcnJvcgIIAAAATG9nRXJyb3ICDQAAAEludmFsaWRNb2R1bGUCEQAAAENhbGxDb250cmFjdEVycm9yAgwAAABVbmF1dGhvcml6ZWQCEgAAAEFnZW50QWxyZWFkeUV4aXN0cwINAAAAQWdlbnROb3RGb3VuZAI=";
export type TransferredRequest = {
	token_id: { contract: { index: number; subindex: number }; id: string };
	from:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	to:
		| { Account: [string] }
		| { Contract: [{ index: number; subindex: number }] };
	amount: string;
};
export const transferredRequestSchemaBase64 =
	"FAAEAAAACAAAAHRva2VuX2lkFAACAAAACAAAAGNvbnRyYWN0DAIAAABpZB0ABAAAAGZyb20VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABhbW91bnQbJQAAAA==";
export type event =
	| {
			AgentRemoved: [
				{
					agent:
						| { Account: [string] }
						| { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| {
			AgentAdded: [
				{
					agent:
						| { Account: [string] }
						| { Contract: [{ index: number; subindex: number }] };
				},
			];
	  }
	| { ModuleAdded: [{ index: number; subindex: number }] }
	| { ModuleRemoved: [{ index: number; subindex: number }] };
export const eventSchemaBase64 =
	"FQQAAAAMAAAAQWdlbnRSZW1vdmVkAQEAAAAUAAEAAAAFAAAAYWdlbnQVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMCgAAAEFnZW50QWRkZWQBAQAAABQAAQAAAAUAAABhZ2VudBUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwLAAAATW9kdWxlQWRkZWQBAQAAAAwNAAAATW9kdWxlUmVtb3ZlZAEBAAAADA==";
export const ENTRYPOINTS: Record<string, EntrypointName.Type> = {
	addAgent: EntrypointName.fromString("addAgent"),
	addModule: EntrypointName.fromString("addModule"),
	agents: EntrypointName.fromString("agents"),
	burned: EntrypointName.fromString("burned"),
	canTransfer: EntrypointName.fromString("canTransfer"),
	isAgent: EntrypointName.fromString("isAgent"),
	minted: EntrypointName.fromString("minted"),
	modules: EntrypointName.fromString("modules"),
	removeAgent: EntrypointName.fromString("removeAgent"),
	removeModule: EntrypointName.fromString("removeModule"),
	supports: EntrypointName.fromString("supports"),
	transferred: EntrypointName.fromString("transferred"),
};
export const ENTRYPOINT_DISPLAY_NAMES: Record<string, string> = {
	addAgent: "Add Agent",
	addModule: "Add Module",
	agents: "Agents",
	burned: "Burned",
	canTransfer: "Can Transfer",
	isAgent: "Is Agent",
	minted: "Minted",
	modules: "Modules",
	removeAgent: "Remove Agent",
	removeModule: "Remove Module",
	supports: "Supports",
	transferred: "Transferred",
};
export const rwaCompliance = {
	init: new InitMethod<initRequest>(
		ModuleReference.fromHexString(
			"545a7c088d65e565b00626869c19bac34e301682979170e689949fbcd4432220",
		),
		ContractName.fromString("rwa_compliance"),
		initRequestSchemaBase64,
	),
	addAgent: new ReceiveMethod<AddAgentRequest, never, AddAgentError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("addAgent"),
		addAgentRequestSchemaBase64,
		undefined,
		addAgentErrorSchemaBase64,
	),
	addModule: new ReceiveMethod<AddModuleRequest, never, AddModuleError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("addModule"),
		addModuleRequestSchemaBase64,
		undefined,
		addModuleErrorSchemaBase64,
	),
	agents: new ReceiveMethod<never, AgentsResponse, AgentsError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("agents"),
		undefined,
		agentsResponseSchemaBase64,
		agentsErrorSchemaBase64,
	),
	burned: new ReceiveMethod<BurnedRequest, never, BurnedError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("burned"),
		burnedRequestSchemaBase64,
		undefined,
		burnedErrorSchemaBase64,
	),
	canTransfer: new ReceiveMethod<
		CanTransferRequest,
		CanTransferResponse,
		CanTransferError
	>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("canTransfer"),
		canTransferRequestSchemaBase64,
		canTransferResponseSchemaBase64,
		canTransferErrorSchemaBase64,
	),
	isAgent: new ReceiveMethod<IsAgentRequest, IsAgentResponse, IsAgentError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("isAgent"),
		isAgentRequestSchemaBase64,
		isAgentResponseSchemaBase64,
		isAgentErrorSchemaBase64,
	),
	minted: new ReceiveMethod<MintedRequest, never, MintedError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("minted"),
		mintedRequestSchemaBase64,
		undefined,
		mintedErrorSchemaBase64,
	),
	modules: new ReceiveMethod<void, ModulesResponse>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("modules"),
		undefined,
		modulesResponseSchemaBase64,
	),
	removeAgent: new ReceiveMethod<RemoveAgentRequest, never, RemoveAgentError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("removeAgent"),
		removeAgentRequestSchemaBase64,
		undefined,
		removeAgentErrorSchemaBase64,
	),
	removeModule: new ReceiveMethod<
		RemoveModuleRequest,
		never,
		RemoveModuleError
	>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("removeModule"),
		removeModuleRequestSchemaBase64,
		undefined,
		removeModuleErrorSchemaBase64,
	),
	supports: new ReceiveMethod<SupportsRequest, SupportsResponse, SupportsError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("supports"),
		supportsRequestSchemaBase64,
		supportsResponseSchemaBase64,
		supportsErrorSchemaBase64,
	),
	transferred: new ReceiveMethod<TransferredRequest, never, TransferredError>(
		ContractName.fromString("rwa_compliance"),
		EntrypointName.fromString("transferred"),
		transferredRequestSchemaBase64,
		undefined,
		transferredErrorSchemaBase64,
	),
	deserializeEvent: (event: ContractEvent.Type): event => {
		return ContractEvent.parseWithSchemaTypeBase64(
			event,
			eventSchemaBase64,
		) as event;
	},
};
export default rwaCompliance;
