import styled from 'styled-components';
import { Button } from '@mui/material';

// Base button styles with enhanced hover effects
const baseButtonStyles = `
    border-radius: 12px !important;
    text-transform: none !important;
    font-weight: 600 !important;
    padding: 10px 20px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    
    &:hover {
        transform: translateY(-2px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export const RedButton = styled(Button)`
  && {
    background-color: #ef4444;
    color: white;
    margin-left: 4px;
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
    ${baseButtonStyles}
    &:hover {
      background-color: #dc2626;
      border-color: #dc2626;
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #1f2937;
    color: white;
    margin-left: 4px;
    box-shadow: 0 4px 14px rgba(31, 41, 55, 0.3);
    ${baseButtonStyles}
    &:hover {
      background-color: #111827;
      border-color: #111827;
      box-shadow: 0 6px 20px rgba(31, 41, 55, 0.4);
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #991b1b;
    color: white;
    box-shadow: 0 4px 14px rgba(153, 27, 27, 0.3);
    ${baseButtonStyles}
    &:hover {
      background-color: #7f1d1d;
      border-color: #7f1d1d;
      box-shadow: 0 6px 20px rgba(153, 27, 27, 0.4);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
    color: #fff;
    box-shadow: 0 4px 14px rgba(30, 58, 138, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
      box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #581c87 0%, #7c3aed 100%);
    color: #fff;
    box-shadow: 0 4px 14px rgba(88, 28, 135, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #6b21a8 0%, #8b5cf6 100%);
      box-shadow: 0 6px 20px rgba(88, 28, 135, 0.4);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #5b3bb8 100%);
    color: #fff;
    box-shadow: 0 4px 14px rgba(127, 86, 218, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #6b4dc9 0%, #4a2fa6 100%);
      box-shadow: 0 6px 20px rgba(127, 86, 218, 0.4);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #166534 0%, #15803d 100%);
    color: #fff;
    box-shadow: 0 4px 14px rgba(22, 101, 52, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
      box-shadow: 0 6px 20px rgba(22, 101, 52, 0.4);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #451a03 0%, #78350f 100%);
    color: white;
    box-shadow: 0 4px 14px rgba(69, 26, 3, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
      border-color: #78350f;
      box-shadow: 0 6px 20px rgba(69, 26, 3, 0.4);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #312e81 0%, #3730a3 100%);
    color: white;
    box-shadow: 0 4px 14px rgba(49, 46, 129, 0.3);
    ${baseButtonStyles}
    &:hover {
      background: linear-gradient(135deg, #3730a3 0%, #4f46e5 100%);
      border-color: #3730a3;
      box-shadow: 0 6px 20px rgba(49, 46, 129, 0.4);
    }
  }
`;
