import { Combobox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDebounce } from "usehooks-ts";
import Spinner from '../Spinner';

function SearchBox(
{
    value,
    onChange,
    onFocus,
    values,
    textValue,
    loading,
    children,
    displayProperty = 'name',
    displayOptionalProperty = '',
    disabled = false,
    classNames = {},
    prefix = () => {},
    liftQuery = () => {}
},
ref
) {
    console.log('value', value)
    console.log('values', values)
    const [query, setQuery] = useState('');
    const delayQuery = useDebounce(query, 500)
    const [isFocused, setFocus] = useState(false)
    const buttonRef = useRef()
    const inputRef = useRef()

    useEffect(() => {
        liftQuery(delayQuery, filteredItems())
    }, [delayQuery])

    const inputChangeHandler = (event) => setQuery(event.target.value)

    const selectElementHandler = () => {
        setQuery('');
        setFocus(false)
        inputRef.current.blur()
        value && liftQuery(value[displayProperty])
    }

    const filteredItems = () => {
        if (!query || (!displayOptionalProperty && !displayProperty)) {
            return values;
        }

        const searchText = query.toLowerCase();

        if (!displayOptionalProperty) {
            return values.filter((item) => {
                return item[displayProperty]
                    .toLowerCase()
                    .includes(searchText)
            });
        }

        return values.filter((item) => {
            return item[displayProperty]
                .toLowerCase()
                .includes(searchText) || item[displayOptionalProperty]
                    ?.toLowerCase()
                    .includes(searchText)
        });
    }

    let list;

    if (loading) {
        list = (
            <div ref={ref} className="absolute overflow-auto w-full z-[9999] cursor-default select-none h-14 text-gray-200 rounded-md text-base border-[#34343466] bg-[#3d3c49]">
                <Spinner size='lg' type="spinner"/>
            </div>
        )
    } else if (filteredItems()?.length === 0 && query !== '') {
        list = (
            <div  ref={ref}className="absolute overflow-auto w-full z-[9999] cursor-default select-none px-4 py-2 text-gray-200 rounded-md text-base border-[#34343466] mt-1 bg-[#3d3c49]">
                Nothing found.
            </div>
        )
    } else {
        list = (
            <div ref={ref} className="absolute z-[9999] mt-2 max-h-60 w-full overflow-auto rounded-md py-1 text-base border-[#34343466] bg-[#3d3c49]">
                {filteredItems().map((item, index) => (
                    <Combobox.Option
                        key={index}
                        as={Fragment}
                        value={item}
                        disabled={item?.selected}
                    >
                        {({ selected, active }) => {
                            selected ||= item[displayProperty] === value?.[displayProperty]

                            return (
                                <li
                                    className={clsx(
                                        'relative cursor-pointer select-none text-left font-normal py-2 pl-4 pr-2',
                                        classNames.item,
                                        selected && 'font-medium bg-blue-600',
                                        active && 'bg-blue-600 text-gray-200',
                                        item?.selected && 'line-through'
                                    )}
                                >
                                    {children
                                        ? children({ item, selected, displayProperty }) 
                                        : (
                                            <span className={'truncate block'}>
                                                {item[displayProperty]}
                                            </span>
                                        )
                                    }
                                </li>
                            )
                        }}
                    </Combobox.Option>
                ))}
            </div>
        )
    }

    return (
        <Combobox as="div" className="relative" value={value} onChange={onChange} disabled={disabled} onBlur={() => setFocus(false)}>
            <Combobox.Input
                ref={inputRef}
                className={clsx(
                    "pl-3 py-2 w-full text-left font-semibold focus:outline-none focus:shadow-outline-blue relative px-3 ext-base rounded-md border-[#34343466] bg-[#3D3C49B2] transition ease-in-out m-0 focus:text-gray-200",
                    disabled && 'cursor-not-allowed',
                    classNames.input
                )}
                onFocus={() => {
                    buttonRef.current.click()
                    setFocus(true)
                }}
                displayValue={(value) => {
                    if (isFocused) {
                        return ''
                    }
                    
                    return value && value[displayProperty] ? (value[displayProperty] ? value[displayProperty] : textValue) : (value?.value ? value.value : textValue)
                }}
                onChange={inputChangeHandler}
                onFocusCapture={onFocus}
                placeholder="Search..."
            />

            {prefix(value)}
            
            <Combobox.Button ref={buttonRef} className="absolute inset-y-0 right-0 flex items-center pr-2">
                {(!value?.[displayProperty] || isFocused) && <BiSearch className='text-lg' />}
            </Combobox.Button>

            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={selectElementHandler}
            >
                <Combobox.Options
                    className="text-gray-200 w-full overflow-auto appearance-none font-semibold rounded-md text-sm bg-[#3d3c49] transition ease-in-out m-0 focus:text-gray-200 focus:outline-none"
                >
                    {list}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
}

// export const CollectionItem = ({ selected, item, displayProperty }) => (
//     <div className='flex items-center'>
//         <div>
//             <Image
//                 showSkeleton
//                 autoResize
//                 src={item.imageUrl ? `${process.env.MOONLY_CLIENT_HOST}${item.imageUrl}` : `/err.png`}
//                 width="40px"
//                 height="40px"
//                 alt={item.slug}
//                 objectFit='cover'
//                 loading='lazy'
//             />
//         </div>
//         <div className={`overflow-hidden ${selected ? 'font-medium' : 'font-normal'} ml-2`}>
//             <p className='truncate'>{item[displayProperty]}</p>
//             <div className='flex items-center'>
//                 <CurrencyIcons type={item.currency} />
//                 <span className='truncate text-xs text-gray-400 ml-1'>{item.blockchainSlug}</span>
//             </div>
//         </div>
//     </div>
// )

// export const RoleItem = ({ item, displayProperty }) => (
//     <>
//         <div className='w-3 h-3 rounded-full float-left mr-2 mt-1.5' style={{ backgroundColor: item.hexColor }} />
//         <span className={'truncate block'}>
//             {item[displayProperty]}
//         </span>
//     </>
// )

export default forwardRef(SearchBox)
