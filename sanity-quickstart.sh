#!/bin/bash

# Win Win Insights - Sanity CMS Quick Start Script

echo "=========================================="
echo "Win Win Insights - Sanity Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm detected: $(npm --version)"
echo ""

# Install Sanity CLI globally if not already installed
if ! command -v sanity &> /dev/null
then
    echo "📦 Installing Sanity CLI globally..."
    npm install -g @sanity/cli
    echo ""
else
    echo "✅ Sanity CLI already installed"
    echo ""
fi

# Navigate to sanity directory
cd sanity

# Install dependencies
echo "📦 Installing Sanity Studio dependencies..."
npm install
echo ""

# Prompt user for project setup
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Login to Sanity:"
echo "   sanity login"
echo ""
echo "2. Initialize your project:"
echo "   sanity init"
echo "   - Choose 'Use existing project'"
echo "   - Select your project"
echo "   - Confirm dataset name"
echo ""
echo "3. Run Studio locally:"
echo "   sanity dev"
echo "   Opens at: http://localhost:3333"
echo ""
echo "4. OR deploy to Sanity Cloud:"
echo "   sanity deploy"
echo "   Access at: https://your-project.sanity.studio"
echo ""
echo "5. Update .env file with your Project ID:"
echo "   VITE_SANITY_PROJECT_ID=your-project-id"
echo ""
echo "=========================================="
echo "📚 For detailed instructions, see:"
echo "   - SANITY_SETUP.md"
echo "   - README_INSIGHTS.md"
echo "=========================================="
