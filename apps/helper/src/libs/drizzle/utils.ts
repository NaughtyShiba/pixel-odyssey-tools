type InferredColumns<T extends readonly string[]> = {
	[K in T[number]]: true;
};

type RelationQuery<
	TRelation extends string,
	TRelationPartner extends string,
	TColumns extends readonly string[],
	TAdditionalColumns extends Record<string, boolean>,
> = {
	[K in TRelation]: {
		with: {
			[K in TRelationPartner]: {
				columns: InferredColumns<TColumns>;
			};
		};
		columns: TAdditionalColumns;
	};
};

export function createRelationQuery<
	TRelation extends string,
	TRelationPartner extends string,
	TColumns extends readonly string[],
	TAdditionalColumns extends Record<string, boolean>,
>(
	relationName: TRelation,
	relationPartnerName: TRelationPartner,
	columns: TColumns,
	additionalColumns: TAdditionalColumns = {} as TAdditionalColumns,
): RelationQuery<TRelation, TRelationPartner, TColumns, TAdditionalColumns> {
	return {
		[relationName]: {
			with: {
				[relationPartnerName]: {
					columns: columns.reduce(
						(acc, col) => ({ ...acc, [col]: true }),
						{},
					) as InferredColumns<TColumns>,
				},
			},
			columns: additionalColumns,
		},
	} as RelationQuery<TRelation, TRelationPartner, TColumns, TAdditionalColumns>;
}
