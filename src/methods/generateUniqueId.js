function generateUniqueId(postfix) {
  return Date.now().toString()+postfix;
}

export default generateUniqueId