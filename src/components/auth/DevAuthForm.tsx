import { Overlay } from "components/Overlay";
import { useOnClickOutside } from "hooks";
import { useRef } from "react";
import { RiStethoscopeLine } from "react-icons/ri";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  acceptedTAS?: boolean;
}

interface DevAuthFormProps {
  hasUserRegistered?: boolean;
  asModal?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DevAuthForm: React.FC<DevAuthFormProps> = ({
  hasUserRegistered,
  asModal,
  setOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  const initialValues: FormValues = hasUserRegistered
    ? {
        email: "",
        password: "",
      }
    : {
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTAS: false,
      };

  const validationSchema = Yup.object({});

  const body = <div ref={ref}>hello</div>;

  if (asModal) {
    return <Overlay>{body}</Overlay>;
  } else {
    return <>{body}</>;
  }
};
