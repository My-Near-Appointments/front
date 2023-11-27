import { Address, States } from "@/hooks/address/interfaces/address.interface";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useAddress = (zip: string) => {
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
    const [address, setAddress] = useState<Address>({
      street: '',
      neighborhood: '',
      city: '',
      state: '' as States,
      zip: '',
    });
  const [error, setError] = useState(null);

  const updateAddress = useCallback((newAddress: Partial<Address>) => {
    setAddress({ ...address, ...newAddress});
  }, [address]);

  useEffect(() => {
    if (zip && zip.length === 8) {
      setIsUpdatingAddress(true);

      const axiosInstance = axios.create({
        baseURL: 'https://viacep.com.br/ws',
      });

      axiosInstance.get(`/${zip}/json/`)
        .then((response) => {
          setIsUpdatingAddress(false);
          updateAddress({
            street: response.data.logradouro,
            neighborhood: response.data.bairro,
            city: response.data.localidade,
            state: response.data.uf,
            zip: response.data.cep,
          })
        })
        .catch((err) => {
          setIsUpdatingAddress(false);
          setError(err);
        });
    }
  }, [zip]);

  return { isUpdatingAddress, address, error };
}
