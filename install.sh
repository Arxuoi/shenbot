#!/bin/bash

echo "╔══════════════════════════════════════╗"
echo "║     NAZE WHATSAPP BOT INSTALLER      ║"
echo "║         Termux Auto Setup            ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}[1/6] Updating packages...${NC}"
pkg update -y && pkg upgrade -y

echo -e "${CYAN}[2/6] Installing Node.js...${NC}"
pkg install nodejs -y

echo -e "${CYAN}[3/6] Installing Git...${NC}"
pkg install git -y

echo -e "${CYAN}[4/6] Checking Node.js version...${NC}"
node -v
npm -v

echo -e "${CYAN}[5/6] Installing dependencies...${NC}"
if [ -f "package.json" ]; then
    npm install
else
    echo -e "${RED}Error: package.json not found!${NC}"
    exit 1
fi

echo -e "${CYAN}[6/6] Creating session folder...${NC}"
mkdir -p session

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     INSTALLATION COMPLETE!           ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}To start the bot, run:${NC}"
echo -e "${CYAN}  npm start${NC}"
echo ""
echo -e "${YELLOW}Or:${NC}"
echo -e "${CYAN}  node index.js${NC}"
echo ""
