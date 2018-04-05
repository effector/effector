//@flow


export function watchWarn(domainName: string, name: string, error: *) {
  console.warn(`


  Watch function should not fail

  Effect:
    ${name}
  Domain:
    ${domainName}
  Error:
    ${error}

`)
}

export function implWarn(domainName: string, name: string, props: *) {
  console.warn(`


  Running an effect without implementation

  Name:
    ${name}
  Domain:
    ${domainName}
  Arguments:
    ${props}


`)
}

export function implError(domainName: string, name: string, props: *) {
  const message = `Running an effect without implementation

  Name:
    ${name}
  Domain:
    ${domainName}
  Arguments:
    ${props}


`
  return new Error(message)
}

