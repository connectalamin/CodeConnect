# CodeConnect Project Development Instructions

## 📋 Project Overview

**CodeConnect** is a Q&A platform for developers built as a **semester solo project** by Alamin (Session 2020-2021) from Comilla University. The project demonstrates modern web development skills and serves as an academic showcase.

**Architecture:**
- **Backend**: Node.js + Express.js + Prisma ORM + PostgreSQL
- **Frontend**: React + Tailwind CSS + shadcn/ui (to be implemented)
- **Features**: User authentication, posts, comments, voting, categories, user profiles, admin panel

**Project Context:**
- **Type**: Academic semester project
- **Developer**: Alamin (Session 2020-2021)
- **Institution**: Comilla University
- **Scope**: Solo development project
- **Purpose**: Demonstrate full-stack development skills and create a functional developer Q&A platform

## 🏗️ Backend Architecture Understanding

### Core Components:
1. **Database Models** (Prisma Schema):
   - `User`: Authentication, profiles, karma points, roles
   - `Post`: Questions with categories, voting, best answers
   - `Comment`: Answers to posts with voting
   - `Vote`: Upvote/downvote system for posts and comments
   - `Category`: Post categorization

2. **API Structure**:
   - `/auth` - Authentication routes
   - `/api` - Post management
   - `/api/post` - Comment management
   - `/api/` - Voting system
   - `/admin/users` - User management
   - `/admin/categories` - Category management

3. **Controllers Organization**:
   - `auth/` - User authentication
   - `post/` - Posts, comments, voting
   - `profile/` - User profiles
   - `admin/` - Admin functionality

## 🎨 Frontend Development Guidelines

### Project Context Reminder:
**This is a semester solo project by Alamin (Session 2020-2021) from Comilla University.**
- Keep the academic nature in mind when designing features
- Focus on demonstrating technical skills rather than commercial features
- Maintain simplicity while showcasing modern development practices
- Consider this as a portfolio piece for academic evaluation

### Technology Stack:
- **Styling**: Tailwind CSS (primary)
- **Components**: shadcn/ui (when specified)
- **Framework**: React (to be implemented)
- **File Extensions**: Use `.jsx` for React components (not `.tsx`)
- **State Management**: React Context or Zustand
- **HTTP Client**: Axios or React Query

### Design System & Color Palette:

#### Primary Colors:
- **Primary Blue**: `#2563eb` (blue-600)
- **Secondary Blue**: `#1d4ed8` (blue-700)
- **Accent Blue**: `#3b82f6` (blue-500)

#### Neutral Colors:
- **Background**: `#ffffff` (white)
- **Secondary Background**: `#f8fafc` (slate-50)
- **Border**: `#e2e8f0` (slate-200)
- **Text Primary**: `#1e293b` (slate-800)
- **Text Secondary**: `#64748b` (slate-500)

#### Semantic Colors:
- **Success**: `#10b981` (emerald-500)
- **Warning**: `#f59e0b` (amber-500)
- **Error**: `#ef4444` (red-500)
- **Info**: `#3b82f6` (blue-500)

#### **IMPORTANT: Text Contrast Rule**
**When using light color backgrounds (like light green, light blue, etc.), NEVER use white or light colored text. Always use dark colored text for proper readability:**
- ✅ **Correct**: `bg-[#7ED957]/20 text-slate-800` (dark text on light background)
- ❌ **Wrong**: `bg-[#7ED957]/20 text-white` (light text on light background)
- ✅ **Correct**: `bg-slate-100 text-slate-800` (dark text on light background)
- ❌ **Wrong**: `bg-slate-100 text-slate-300` (light text on light background)

**Examples of good contrast combinations:**
- Light green background: Use `text-slate-800` or `text-slate-900`
- Light blue background: Use `text-slate-800` or `text-slate-900`
- Light gray background: Use `text-slate-700` or `text-slate-800`
- White background: Use `text-slate-800` or `text-slate-900`

**🚨 REMEMBER: Always use dark text on light backgrounds for readability!**

### UI/UX Standards:

#### Typography:
- **Headings**: Inter font family
- **Body**: Inter or system font
- **Code**: JetBrains Mono or Fira Code

#### Spacing System:
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

#### Component Guidelines:
1. **Cards**: Rounded corners (lg), subtle shadows
2. **Buttons**: Consistent padding, hover states
3. **Forms**: Clear labels, validation states
4. **Navigation**: Sticky header, clear hierarchy
5. **Responsive**: Mobile-first approach

## 🔧 Development Workflow

### Step-by-Step Process:

1. **Analysis Phase**:
   - **Use Sequential Thinking**: Break down requirements systematically
   - Understand current backend structure
   - Identify API endpoints needed
   - Plan component hierarchy
   - Design data flow

2. **Implementation Phase**:
   - **Use Sequential Thinking**: Plan implementation steps carefully
   - Start with core components
   - Implement authentication flow
   - Build main features incrementally
   - Test each feature thoroughly

3. **Refinement Phase**:
   - **Use Sequential Thinking**: Analyze optimization opportunities
   - Optimize performance
   - Improve accessibility
   - Add animations/transitions
   - Cross-browser testing

### Sequential Thinking Integration:

#### **Automatic Usage Scenarios:**
- **Complex Feature Implementation**: When building multi-step features
- **Debugging Issues**: When troubleshooting complex problems
- **Architecture Decisions**: When making structural changes
- **Performance Optimization**: When analyzing and improving performance
- **Security Implementation**: When adding authentication/authorization
- **Database Operations**: When modifying schema or queries
- **API Design**: When creating new endpoints or modifying existing ones
- **Component Architecture**: When designing complex UI components

#### **Sequential Thinking Workflow:**
1. **Problem Identification**: Clearly define what needs to be solved
2. **Analysis**: Break down into manageable components
3. **Solution Design**: Plan the approach step-by-step
4. **Implementation**: Execute with careful monitoring
5. **Verification**: Test and validate each step
6. **Documentation**: Record decisions and reasoning

### Error Prevention Guidelines:

1. **Always verify**:
   - API endpoint responses
   - Data types and structures
   - Component prop requirements
   - State management consistency

2. **Test thoroughly**:
   - User interactions
   - Edge cases
   - Responsive behavior
   - Loading states

3. **Document decisions**:
   - Component architecture choices
   - State management patterns
   - API integration methods

### Documentation & Research Protocol:

1. **For Any Technology/Library**:
   - **Primary Source**: Use Context7 for up-to-date documentation
   - **Verification**: Cross-reference with official docs
   - **Best Practices**: Check for current recommendations

2. **For shadcn/ui Components**:
   - **Primary Source**: Use shadcn MCP server for component guidance
   - **Documentation**: Verify with Context7 for latest shadcn/ui docs
   - **Customization**: Follow design system guidelines

3. **Implementation Process**:
   - Research → Context7 for documentation
   - Plan → Design system integration
   - Implement → Follow best practices
   - Test → Verify functionality

### Sequential Thinking Protocol:

#### **Automatic Sequential Thinking Usage:**
- **When to Use**: For complex problem-solving, architecture decisions, debugging, and multi-step implementations
- **Purpose**: Break down complex tasks into logical steps, analyze problems systematically, and ensure thorough understanding
- **Automatic Trigger**: Use sequential thinking when:
  - Analyzing complex requirements
  - Debugging issues
  - Planning architecture changes
  - Implementing new features
  - Optimizing performance
  - Making design decisions

#### **Sequential Thinking Process:**
1. **Problem Analysis**:
   - Break down the problem into components
   - Identify dependencies and relationships
   - Map out the solution space

2. **Solution Planning**:
   - Generate multiple approaches
   - Evaluate trade-offs
   - Select optimal solution

3. **Implementation Strategy**:
   - Plan step-by-step execution
   - Identify potential issues
   - Prepare fallback options

4. **Verification & Testing**:
   - Validate each step
   - Test assumptions
   - Ensure quality standards

#### **Sequential Thinking Guidelines:**
- **Always start with analysis** before implementation
- **Document each step** for clarity and debugging
- **Question assumptions** at each stage
- **Consider alternatives** before committing to solutions
- **Verify understanding** before proceeding
- **Plan for edge cases** and error scenarios
- **Remember this is an academic semester project** - focus on demonstrating skills rather than commercial features

#### **Complex Problem Examples Requiring Sequential Thinking:**
- Database schema modifications
- API endpoint design and implementation
- Component architecture decisions
- State management strategies
- Performance optimization
- Security implementation
- Error handling patterns
- Testing strategy development

## 🎯 Feature Implementation Priority

### Phase 1: Core Foundation
1. **Authentication System**
   - Login/Register forms
   - JWT token management
   - Protected routes

2. **Basic Layout**
   - Header with navigation
   - Main content area
   - Footer

3. **Post Listing**
   - Display posts with categories
   - Basic filtering
   - Pagination

### Phase 2: Core Features
1. **Post Management**
   - Create/edit posts
   - Rich text editor
   - Image upload

2. **Comment System**
   - Add/edit comments
   - Nested replies
   - Best answer selection

3. **Voting System**
   - Upvote/downvote posts/comments
   - Vote count display

### Phase 3: Advanced Features
1. **User Profiles**
   - Profile pages
   - Karma points
   - User activity

2. **Admin Panel**
   - User management
   - Category management
   - Content moderation

3. **Search & Filtering**
   - Advanced search
   - Category filtering
   - Tag system

## 🚨 Communication Protocol

### When Confusion Arises:

1. **Ask for clarification** on:
   - Specific feature requirements
   - Design preferences
   - Technical implementation details
   - Priority of features

2. **Provide options** when:
   - Multiple approaches exist
   - Design decisions need input
   - Technical trade-offs arise

3. **Document decisions** for:
   - Architecture choices
   - Component structure
   - State management patterns

### Documentation Guidelines:

#### **Always Use Context7 for Documentation:**
- **When to use**: For any library, framework, or technology documentation
- **Purpose**: Get up-to-date, accurate documentation
- **Process**: 
  1. Use Context7 to fetch latest documentation
  2. Verify current best practices
  3. Implement based on official docs
  4. Cross-reference with multiple sources if needed

#### **shadcn/ui Implementation Protocol:**
- **When requested**: Use shadcn MCP server for component guidance
- **Process**:
  1. Check shadcn MCP server for component recommendations
  2. Get proper implementation code
  3. Customize according to design system
  4. Verify with Context7 for latest shadcn/ui docs

### Clarification Questions Format:
```
❓ Clarification Needed:
- What specific aspect needs clarification?
- What are the current options?
- What is the preferred approach?
- Any specific constraints or requirements?
```

### Mantine Removal Decision Format:
```
🔍 Mantine Component Analysis:
- Component: [Component Name]
- Usage: [Single/Multiple pages]
- Dependencies: [List of dependencies]
- Risk Level: [Low/Medium/High]
- Recommendation: [Remove/Keep/Skip]
- Alternative: [Tailwind/shadcn/ui/Custom]
- Reason: [Detailed explanation]
```

### Documentation Request Format:
```
📚 Documentation Needed:
- Library/Framework: [Name]
- Topic: [Specific aspect]
- Context: [What you're trying to achieve]
- Priority: [High/Medium/Low]
```

### shadcn/ui Request Format:
```
🎨 shadcn/ui Component Needed:
- Component Type: [Button/Card/Form/etc.]
- Use Case: [What you're building]
- Design Requirements: [Styling needs]
- Integration: [How it fits in the project]
```

### Sequential Thinking Decision Format:
```
🧠 Sequential Thinking Analysis:
- Problem: [What needs to be solved]
- Complexity Level: [Low/Medium/High]
- Steps Required: [Estimated number of steps]
- Dependencies: [What this depends on]
- Expected Outcome: [What should be achieved]
- Risk Assessment: [Potential issues to consider]
```

## 📝 Code Quality Standards

### Backend:
- Use async/await for database operations
- Implement proper error handling
- Validate input data
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Frontend:
- Use TypeScript when possible
- Implement proper loading states
- Handle error boundaries
- Use semantic HTML
- Ensure accessibility compliance

### General:
- Follow consistent naming conventions
- Use meaningful commit messages
- Implement proper logging
- Write clean, readable code
- Add comments for complex logic

## 🎨 shadcn/ui Integration

### When to Use shadcn/ui:
- When explicitly requested
- For complex form components
- For advanced UI patterns
- When Tailwind alone is insufficient

### shadcn/ui Guidelines:
- Customize theme to match design system
- Maintain consistency with custom components
- Use shadcn/ui as enhancement, not replacement
- Ensure proper TypeScript integration

## ⚠️ Mantine UI Library Management

### Mantine Removal Guidelines:

#### **Before Removing Mantine:**
1. **Analyze Dependencies**:
   - Check which components use Mantine
   - Identify shared components across multiple pages
   - Map out component relationships and dependencies

2. **Risk Assessment**:
   - If multiple pages use the same Mantine component → **SKIP REMOVAL**
   - If single page usage → Safe to remove and replace
   - If complex form components → Consider alternatives carefully

#### **Safe Removal Scenarios:**
- ✅ Single page components
- ✅ Simple UI elements (buttons, cards, inputs)
- ✅ Non-critical components
- ✅ Components with clear Tailwind alternatives

#### **Skip Removal Scenarios:**
- ❌ Components used across multiple pages
- ❌ Complex form components with validation
- ❌ Advanced UI patterns (modals, dropdowns, date pickers)
- ❌ Components with complex state management
- ❌ When removal would cause cascading errors

#### **Alternative Approaches:**

1. **Tailwind CSS Alternatives**:
   ```jsx
   // Instead of Mantine Button
   <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
     Click me
   </button>
   
   // Instead of Mantine Card
   <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
     Card content
   </div>
   ```

2. **shadcn/ui Components**:
   ```jsx
   // For complex form components
   import { Button } from "@/components/ui/button"
   import { Card, CardContent, CardHeader } from "@/components/ui/card"
   ```

3. **Custom Components**:
   ```jsx
   // Create reusable components with Tailwind
   const CustomButton = ({ children, variant = "primary", ...props }) => {
     const variants = {
       primary: "bg-blue-600 hover:bg-blue-700 text-white",
       secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
       danger: "bg-red-600 hover:bg-red-700 text-white"
     }
     
     return (
       <button 
         className={`px-4 py-2 rounded-md font-medium transition-colors ${variants[variant]}`}
         {...props}
       >
         {children}
       </button>
     )
   }
   ```

#### **Removal Process:**
1. **Step 1**: Identify component usage across the project
2. **Step 2**: Check for shared dependencies
3. **Step 3**: If safe → Create Tailwind alternative
4. **Step 4**: If risky → Keep Mantine, document reason
5. **Step 5**: Test thoroughly after any changes

#### **Documentation Requirements:**
- Document why Mantine was kept in specific cases
- List alternative components created
- Note any performance improvements
- Track bundle size changes

## 🔄 Development Commands

### Backend:
```bash
npm run server    # Start development server
npm run generate  # Generate Prisma client
npm run clean     # Clean database
```

### Frontend (when implemented):
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run linter
npm run test      # Run tests
```

---

## 📋 Quick Reference

### Color Classes (Tailwind):
- Primary: `bg-blue-600`, `text-blue-600`
- Secondary: `bg-slate-100`, `text-slate-600`
- Success: `bg-emerald-500`, `text-emerald-500`
- Warning: `bg-amber-500`, `text-amber-500`
- Error: `bg-red-500`, `text-red-500`

### Common Patterns:
- Cards: `bg-white rounded-lg shadow-md p-6`
- Buttons: `px-4 py-2 rounded-md font-medium transition-colors`
- Forms: `space-y-4`
- Layout: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### API Endpoints:
- Auth: `/auth/login`, `/auth/register`
- Posts: `/api/posts`, `/api/posts/:id`
- Comments: `/api/post/:postId/comments`
- Votes: `/api/votes`
- Profile: `/api/profile`
- Admin: `/admin/users`, `/admin/categories`

---

**Remember**: Always prioritize user experience, maintain code quality, and communicate clearly when clarification is needed. This instruction file should be updated as the project evolves. 