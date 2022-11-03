import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { chat } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'