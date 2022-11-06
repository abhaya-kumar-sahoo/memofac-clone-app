var format = /[!@#$%^&*_\=\[\]{};':"\\|,.<>\/?]+/;

export const refactorContacts = (contactsList = [], countryCode = '+91+') => {
  return contactsList
    .filter(item => item.phoneNumbers.length !== 0)
    .filter(contact => !format.test(contact.phoneNumbers[0].number))
    .filter(item => !item.phoneNumbers[0].number.includes(countryCode));
};
