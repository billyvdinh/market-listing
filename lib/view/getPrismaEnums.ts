export interface PrismaEnum {
  keys(o: object): string[]
}
export const getFriendlyEnumValue = (capitalString: string) => {
  const firstLetter = capitalString[0]
  const restOfString = capitalString.substring(1)
  const lowercaseString = restOfString.toLowerCase()
  const restWithoutUnderscores = lowercaseString.replace(/_+(\w|$)/g, function ($$, $1) {
    return ` ${$1.toUpperCase()}`
  })
  return firstLetter + restWithoutUnderscores
}

export const getOptionsFromEnum = (prismaEnum: PrismaEnum) => {
  const enums = Object.values(prismaEnum)
  return enums.map((enumValue) => ({
    value: enumValue,
    displayName: getFriendlyEnumValue(enumValue),
  }))
}
