function isValidIPAddress(address: string) : boolean {
  let splitedAddress = address.substring(0, address.length - 1).split(".")
  let num  
  for(let i = 0; i < splitedAddress.length; i++) {
      num = parseInt(splitedAddress[i])
      if((num < 0 || num > 255) || (num[0] === "0" && num.length > 0)) {
          return false
      }
  }

  return true
}

console.log(isValidIPAddress(".255.255.11.135"))