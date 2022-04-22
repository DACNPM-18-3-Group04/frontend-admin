import OpenDrawerButton from './openDrawerButton';

export default function NavigationDrawerButton({ toggleDrawer = () => {} }) {
  const handleToggle = () => {
    toggleDrawer();
  };

  return (
    <>
      <OpenDrawerButton onClick={handleToggle} />
    </>
  );
}
