
export const isAdmin = () => localStorage.getItem('userRole') === 'admin';
export const isFaculty = () => localStorage.getItem('userRole') === 'faculty';
