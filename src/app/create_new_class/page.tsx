import AccessDenied from '@/components/ActionDenied';
import { ClassCreationForm } from '@/components/ClassForm';
import { getUserRole } from '@/services/api';
import { redirect } from 'next/navigation';

const CreateNewClass = async () => {
  const data = await getUserRole();

  if (!data) {
   
 
    return redirect('/');
  }

  // student has no right to get to the classCreationForm, if somehow he gets here 
  // he will be redirected to a special component which will send him to a homepage after 5 secs (user friendly info)
  if (data.role === 'student') {
    return <AccessDenied/>

  }

  return <ClassCreationForm />;
};

export default CreateNewClass;
