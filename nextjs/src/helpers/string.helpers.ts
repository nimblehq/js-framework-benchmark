const slugizePathname = (pathname: string) => {
  const lastUrlPart = pathname.split('/').filter(Boolean).pop();
  const slug = lastUrlPart ? lastUrlPart.replace(/[_\s]/, '-') : '';

  return slug;
};

export { slugizePathname };
