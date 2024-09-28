import { Form } from "react-bootstrap";
import Select, { MultiValue } from 'react-select';

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ua', label: 'Ukrainian' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'pt', label: 'Portuguese' }
];

interface LanguagesSelectionFieldProps {
    selectedLanguages: string[];
    setSelectedLanguages: (languages: string[]) => void;
}

const LanguagesSelectionField: React.FC<LanguagesSelectionFieldProps> = ({ selectedLanguages, setSelectedLanguages }) => {
    const handleLanguageSelection = (newValue: MultiValue<{ value: string; label: string; }>) => {
        setSelectedLanguages(newValue.map(language => language.label));
    };

    return (
        <Form.Group className="mb-3">
            <Select
                isMulti
                options={languageOptions}
                value={languageOptions.filter(language => selectedLanguages.includes(language.label))}
                onChange={handleLanguageSelection}
                placeholder="Select language(s)"
                styles={{
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#e0f7fa' : state.isFocused ? '#656565' : '#fff',
                        color: state.isSelected ? '#000' : state.isFocused ? '#FFFFFF' : '#000',
                        cursor: 'pointer',
                    }),
                    control: (provided) => ({
                        ...provided,
                        borderColor: '#ccc',
                        cursor: 'pointer',
                    }),
                }}
            />
        </Form.Group>
    );
};

export default LanguagesSelectionField;