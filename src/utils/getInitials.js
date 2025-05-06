export const getInitials = (string = '') => {
    return string
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase() || '')
      .join('');
  };
