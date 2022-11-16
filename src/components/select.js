import Select from 'react-select'

export default function MySelect ({ options, onChange, ...props }) {
    return (
        <Select options={options} onChange={onChange}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    neutral0: '#1a2234',
                    neutral20: '#243049',
                    //neutral30: '#243049',
                    neutral80: '#fff',
                    primary25: '#206bc4',
                    primary: '#206bc4',
                }
            })}
            styles={{
                menu: (provided, state) => ({
                    ...provided,
                    backgroundColor: '#242d42',
                    border: '1px solid white',
                }),
                option: (provided, state) => ({
                    ...provided,
                    color: 'white',
                }),
            }}
        />
    )
}