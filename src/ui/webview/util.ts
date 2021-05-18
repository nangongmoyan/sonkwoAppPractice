/**
 * created by lijianpo on 2021/05/18
 */

let eventId = 0
const sendEvent = (data = 0) => {
  const event = 'sonkwo'
  eventId += 1
  const eventVariable = `event${eventId}`
  return `
  var ${eventVariable} = new CustomEvent("${event}",{
    detail:${JSON.stringify(data)}
  });
  window.dispatchEvent(${eventVariable})
  `
}

export { sendEvent }
