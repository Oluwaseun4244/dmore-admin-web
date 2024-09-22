export const copyText = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    return { error: false, copied: true }
  } catch (err) {

    return { error: true, copied: false }
  }

};