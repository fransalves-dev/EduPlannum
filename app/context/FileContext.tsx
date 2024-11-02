import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { FilesRequest, FilesResponse } from '../../types/filesProps';

type ChildrenProps = {
  children: ReactNode;
};

interface IFileContext {
  fileSelected: FilesResponse | null;
  setFileSelected: Dispatch<SetStateAction<FilesResponse | null>>;
  files: FilesResponse[] | null;
  setFiles: Dispatch<SetStateAction<FilesResponse[] | null>>;
  newFile: FilesRequest | null;
  setNewFile: Dispatch<SetStateAction<FilesRequest | null>>;
}
const initialdata = {
  fileSelected: null,
  setFileSelected: () => {},
  files: null,
  setFiles: () => {},
  newFile: null,
  setNewFile: () => {},
};

export const FileContext = createContext<IFileContext>(initialdata);

export const FileProvider = ({ children }: ChildrenProps) => {
  const [fileSelected, setFileSelected] = useState<FilesResponse | null>(
    initialdata.fileSelected
  );
  const [files, setFiles] = useState<FilesResponse[] | null>(initialdata.files);
  const [newFile, setNewFile] = useState<FilesRequest | null>(
    initialdata.newFile
  );

  return (
    <FileContext.Provider
      value={{
        fileSelected,
        setFileSelected,
        files,
        setFiles,
        newFile,
        setNewFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
