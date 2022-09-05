import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelect1({data,setselectval}) {
    const set = [...new Set(data&&data.map((d)=>{
        return d.country
        }))]
    const handleChange=(e)=>{
        setselectval(e.target.value)
    }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" style={{color:"white", fontSize:"1.4em" }} htmlFor="uncontrolled-native"  >
          Country
        </InputLabel>
        <NativeSelect
        defaultValue={"All"}
          inputProps={{
            name: 'country',
            id: 'uncontrolled-native',
          }}
          onChange={handleChange}
        >
            <option value={"All"}>All</option>
          {set?.map((d,v)=>{
          return <option  key={v }value={d}>{d}</option>
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}