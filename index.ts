import accounts from './accounts.json'

interface Account {
  application: string | number
  emails: string[]
  name: string
}

interface Person {
  applications: (string | number)[]
  emails: string[]
  name: string
}

function getMergedArray(arr1: string[], arr2: string[]) {
  const mergedArray = [...new Set([...arr1, ...arr2])]
  if (mergedArray.length === arr1.length + arr2.length) {
    return null
  } else {
    return mergedArray
  }
}

function mergeAccounts(input: Person[]): Person[] {
  const output = input.reduce((prev: Person[], cur: Person) => {
    if (prev.length === 0) {
      return [
        {
          applications: [...cur.applications],
          emails: [...cur.emails],
          name: cur.name
        }
      ]
    }
    let duplicationExist = false
    const res: Person[] = [...prev]

    for (let i = 0; i < prev.length; i++) {
      const person = prev[i]
      const mergedEmails = getMergedArray(person.emails, cur.emails)
      if (mergedEmails) {
        duplicationExist = true
        res[i] = {
          applications: [
            ...new Set([...person.applications, ...cur.applications])
          ],
          emails: [...mergedEmails],
          name: person.name
        }
        break
      }
    }

    if (!duplicationExist) {
      res.push({
        applications: [...cur.applications],
        emails: [...cur.emails],
        name: cur.name
      })
    }

    return res
  }, [])

  if (input.length === output.length) {
    return output
  } else {
    return mergeAccounts(output)
  }
}

console.log(
  mergeAccounts(
    accounts.map((account: Account) => ({
      ...account,
      applications: [account.application]
    }))
  )
)
