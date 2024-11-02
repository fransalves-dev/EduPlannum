import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { FolderRequest, FolderResponse } from '../../types/foldersProp';

type ChildrenProps = {
  children: ReactNode;
};

interface IFolderContext {
  folderSelected: FolderResponse | null;
  setFolderSelected: Dispatch<SetStateAction<FolderResponse | null>>;
  folders: FolderResponse[] | null;
  setFolders: Dispatch<SetStateAction<FolderResponse[] | null>>;
  newFolder: FolderRequest | null;
  setNewFolder: Dispatch<SetStateAction<FolderRequest | null>>;
}
const initialdata = {
  folderSelected: null,
  setFolderSelected: () => {},
  folders: null,
  setFolders: () => {},
  newFolder: null,
  setNewFolder: () => {},
};

export const FolderContext = createContext<IFolderContext>(initialdata);

export const FolderProvider = ({ children }: ChildrenProps) => {
  const [folderSelected, setFolderSelected] = useState<FolderResponse | null>(
    initialdata.folderSelected
  );
  const [folders, setFolders] = useState<FolderResponse[] | null>(
    initialdata.folders
  );
  const [newFolder, setNewFolder] = useState<FolderRequest | null>(
    initialdata.newFolder
  );

  return (
    <FolderContext.Provider
      value={{
        folderSelected,
        setFolderSelected,
        folders,
        setFolders,
        newFolder,
        setNewFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
